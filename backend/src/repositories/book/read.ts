import { Result } from '@badrap/result';
import type {
  BookGenericReturn,
  BookReadAllReturn,
  BookReadSpecificData,
} from './types';
import client from '../client';

/**
 * Repository call that reads data about a specific book.
 *
 * @param data object containing an id of the book
 * @returns - On success: Book record
 *          - On failure: NonexistentRecordError if the book does not exist
 *                        generic error otherwise
 */
export const specific = async (
  data: BookReadSpecificData
): BookGenericReturn => {
  try {
    return await client.$transaction(async (tx) => {
      const book = await tx.book.findUniqueOrThrow({
        where: { id: data.bookId },
      });

      return Result.ok(book);
    });
  } catch (e) {
    return Result.err(e as Error);
  }
};

/**
 * Repository call that reads data of all books.
 *
 * @returns - On success: All books
 *          - On failure: A generic error
 */
export const all = async (): BookReadAllReturn => {
  try {
    const result = await client.book.findMany({
      where: {
        deletedAt: null,
        orderId: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return Result.ok(result);
  } catch (e) {
    return Result.err(e as Error);
  }
};
