import { Result } from '@badrap/result';
import client from '../client';
import type { OrderCreateData, OrderCreateResult } from './types';
import { DeletedRecordError, NonexistentRecordError } from '../types/errors';

/**
 * Repository call that creates a Order.
 *
 * @param data - containing necessary data to create a new order record
 * @returns - Result.ok(Order &{ Buyer: User }) on success
 *          - UserNotFound if the user doesn't exist
 *          - Result.err(_) otherwise
 */
const create = async (data: OrderCreateData): OrderCreateResult => {
  try {
    return await client.$transaction(async (tx) => {
      const { shippingData, ...invoiceData } = data;

      await tx.user.findUniqueOrThrow({
        where: { id: invoiceData.userId },
      });

      const books = await tx.book.findMany({
        where: {
          id: {
            in: data.bookId,
          },
        },
      });

      const nullDeletedAt = books.every(
        (book) => book.deletedAt === null && book.orderId == null
      );

      if (!nullDeletedAt) {
        return Result.err(
          new DeletedRecordError('Book has been already deleted!')
        );
      }
      if (books.length !== data.bookId.length || books.length === 0) {
        return Result.err(
          new NonexistentRecordError("One or more books don't exist")
        );
      }

      const shippingInfo = await tx.shippingInfo.create({
        data: {
          ...shippingData
        }
      });


      const order = await tx.order.create({
        data: {
          buyerId: invoiceData.userId,
          amount: invoiceData.amount,
          shippingInfoId: shippingInfo.id,
          books: {
            connect: books.map((book) => ({ id: book.id })),
          },
        },
        include: {
          shippingInfo: true,
          buyer: {
            select: {
              id: true,
              createdAt: true,
              username: true,
            },
          },
          books: true,
        },
      });

      return Result.ok(order);
    });
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default create;
