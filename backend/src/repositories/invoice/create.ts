import { Result } from '@badrap/result';
import client from '../client';
import type { InvoiceCreateData, InvoiceCreateResult } from './types';
import { DeletedRecordError, NonexistentRecordError } from '../types/errors';

/**
 * Repository call that creates a Invoice.
 *
 * @param data - containing necessary data to create a new invoice record
 * @returns - Result.ok(Invoice &{ Buyer: User }) on success
 *          - UserNotFound if the user doesn't exist
 *          - Result.err(_) otherwise
 */
const create = async (data: InvoiceCreateData): InvoiceCreateResult => {
  try {
    return await client.$transaction(async (tx) => {
      const { userData, address, ...invoiceData } = data;

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

      const nullDeletedAt = books.every((book) => book.deletedAt === null);

      if (!nullDeletedAt) {
        return Result.err(new DeletedRecordError('Book has been already deleted!'));
      }
      if (books.length !== data.bookId.length) {
        return Result.err(new NonexistentRecordError("One or more books don't exist"));
      }

      const invoice = await tx.invoice.create({
        data: {
          buyerId: invoiceData.userId,
          amount: invoiceData.amount,
          name: userData.name,
          surname: userData.surname,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          street: address.street,
          city: address.city,
          zipcode: address.zipcode,
          country: address.country,
          books: {
            connect: books.map((book) => ({ id: book.id })),
          },
        },
        include: {
          buyer: true,
          books: true,
        },
      });

      return Result.ok(invoice);
    });
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default create;
