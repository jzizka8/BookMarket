import { Result } from '@badrap/result';
import type { Book, Invoice, User } from '@prisma/client';
import type {
  InvoiceReadAllData,
  InvoiceReadAllResult,
  InvoiceReadSpecificData,
  InvoiceReadSpecificResult,
} from './types';
import { specific as specificUser } from '../user/read';
import { UserNotFound } from './types/errors';
import client from '../client';

/**
 * Repository call that reads data about all invoices of specific user.
 *
 * @param   data  - buyer(user) id
 * @returns       - On success: Result.ok(Invoice[] & {buyer: User})
 *                - On failure: UserNotFound('User was not found.')
 *                              otherwise Result.err(_)
 */
export const allByUser = async (
  data: InvoiceReadSpecificData
): InvoiceReadSpecificResult => {
  try {
    const user = await specificUser({ id: data.buyerId });
    if (user.isErr) {
      return Result.err(new UserNotFound('User was not found.'));
    }
    const { booksForSale, invoices, ...userEntity } = user.unwrap();
    const userInvoices = await client.invoice.findMany({
      where: { buyerId: data.buyerId },
      include: { books: true },
    });

    const result = userInvoices as (Invoice & { books: Book[] })[] & {
      buyer: User;
    };
    result.buyer = userEntity;
    return Result.ok(
      userInvoices as (Invoice & { books: Book[] })[] & { buyer: User }
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

/**
 * Repository call that reads data about a specific invoice.
 *
 * @param   data  - invoice id
 * @returns       - On success: Result.ok(Invoice & {buyer: User})
 *                - On failure: otherwise Result.err(_)
 */
export const specific = async (
  data: InvoiceReadAllData
): InvoiceReadAllResult => {
  try {
    return Result.ok(
      await client.invoice.findUniqueOrThrow({
        where: { id: data.id },
        include: { buyer: true, books: true },
      })
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};
