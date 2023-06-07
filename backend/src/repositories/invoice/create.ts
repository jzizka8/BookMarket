import { Result } from '@badrap/result';
import client from '../client';
import { specific } from '../user/read';
import type { InvoiceCreateData, InvoiceCreateResult } from './types';
import { BookNotFound, DeletedBook, UserNotFound } from './types/errors';

/**
 * Repository call that creates a Invoice.
 *
 * @param data - containing necessary data to create a new invoice record
 * @returns - Result.ok(Invoice &{ Buyer: User }) on success
 *          - UserNotFound if the user don't exist
 *          - Result.err(_) otherwise
 */
const create = async (data: InvoiceCreateData): InvoiceCreateResult => {
  try {
    return await client.$transaction(async (tx) => {
      const { userData, address, ...invoiceData } = data;

      const user = await specific({ id: data.userId });
      if (user.isErr) {
        return Result.err(
          new UserNotFound('User with this id does not exist!')
        );
      }

      const booksForPurchase = await tx.book.findMany({
        where: {
          id: {
            in: data.bookId,
          },
        },
      });

      const nullDeletedAt = booksForPurchase.every(
        (book) => book.deletedAt === null
      );

      if (!nullDeletedAt) {
        return Result.err(new DeletedBook('Book has been already deleted!'));
      }
      if (booksForPurchase.length !== data.bookId.length) {
        return Result.err(new BookNotFound("One or more books don't exist"));
      }

      const deletedAt = new Date();

      await tx.book.updateMany({
        where: {
          id: {
            in: data.bookId,
          },
        },
        data: { deletedAt },
      });

      const books = await tx.book.findMany({
        where: {
          id: {
            in: data.bookId,
          },
        },
      });

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
