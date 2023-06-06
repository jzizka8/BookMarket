import { Result } from '@badrap/result';
import type { Book } from '@prisma/client';
import client from '../client';
import genericError from '../types';
import type { BookDeleteData } from './types';
import { DeletedRecordError, NonexistentRecordError } from '../types/errors';

/**
 * Repository call that deletes a book.
 *
 * @param data object containing an id (string)
 * @returns - On success: book
 *          - On failure: NonExistentRecordError if the book does not exist
 *                        DeletedRecordError if the book was already deleted
 *                        generic error otherwise
 */
const deleteBook = async (data: BookDeleteData): Promise<Result<Book>> => {
  try {
    const book = await client.book.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!book) {
      return Result.err(
        new NonexistentRecordError('Given book does not exist')
      );
    }

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
    return genericError;
  }
};

export default deleteBook;
