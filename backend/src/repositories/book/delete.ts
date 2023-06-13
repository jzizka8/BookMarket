import { Result } from '@badrap/result';
import client from '../client';
import type { BookDeleteData, BookGenericReturn } from './types';
import { DeletedRecordError } from '../types/errors';

/**
 * Repository call that deletes a book.
 *
 * @param data object containing an id (string)
 * @returns - On success: book
 *          - On failure: NotFoundError if the book does not exist
 *                        DeletedRecordError if the book was already deleted
 *                        generic error otherwise
 */
const deleteBook = async (data: BookDeleteData): BookGenericReturn => {
  try {
    const book = await client.book.findUniqueOrThrow({
      where: {
        id: data.id,
      },
    });

    if (book.deletedAt) {
      return Result.err(
        new DeletedRecordError('Given book was already deleted!')
      );
    }

    return await client.$transaction(async (tx) => {
      const deletedAt = new Date();

      const bookUpdated = await tx.book.update({
        where: {
          id: data.id,
        },
        data: {
          deletedAt,
        },
      });

      return Result.ok(bookUpdated);
    });
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default deleteBook;
