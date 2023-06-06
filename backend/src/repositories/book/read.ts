import { Result } from '@badrap/result';
import type { Book } from '@prisma/client';
import type { BookReadSpecificData } from './types';
import client from '../client';
import { NonexistentRecordError } from '../types/errors';
import genericError from '../types';

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
): Promise<Result<Book>> => {
  try {
    return await client.$transaction(async (tx) => {
      const book = await tx.book.findUnique({
        where: { id: data.id },
      });

      if (!book) {
        return Result.err(
          new NonexistentRecordError('The specified book does not exist!')
        );
      }

      return Result.ok(book);
    });
  } catch (e) {
    return genericError;
  }
};

/**
 * Repository call that reads data of all books.
 *
 * @param data object containing id of the book
 * @returns - On success: All categories (without books)
 *          - On failure: A generic error
 */
export const all = async (): Promise<Result<Book[]>> => {
  try {
    const result = await client.book.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return Result.ok(result);
  } catch (e) {
    return genericError;
  }
};
