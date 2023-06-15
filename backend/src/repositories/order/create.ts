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
      const { shippingData, ...orderData } = data;

      if (orderData.bookId.length === 0) {
        return Result.err(
          new NonexistentRecordError("Order without books can't be created.")
        );
      }

      await tx.user.findUniqueOrThrow({
        where: { id: orderData.userId },
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
          new DeletedRecordError('Book(s) has been already deleted!')
        );
      }

      if (books.length !== data.bookId.length) {
        return Result.err(
          new NonexistentRecordError("One or more books don't exist anymore.")
        );
      }

      const shippingInfo = await tx.shippingInfo.create({
        data: {
          ...shippingData
        }
      });


      const order = await tx.order.create({
        data: {
          buyerId: orderData.userId,
          amount: orderData.amount,
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
