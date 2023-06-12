import { Result } from '@badrap/result';
import client from '../client';
import type { BookGenericReturn, BookUpdateData } from './types';
import { DeletedRecordError } from '../types/errors';

/**
 * Repository call that updates the book's data.
 *
 *
 * @param data object containing the book id and fields to be updated
 * @returns - On success: An updated book record
 *          - On failure: NotFoundError if the book does not exist
 *                        DeletedRecordError if the book was already deleted
 *                        generic error otherwise
 */
const update = async (data: BookUpdateData): BookGenericReturn => {
  try {
    const updatedData = Object.fromEntries(
      Object.entries(data.toUpdate).filter(([, value]) => value !== undefined)
    );

    const book = await client.book.findUniqueOrThrow({
      where: {
        id: data.bookId,
      },
    });

    if (book.deletedAt) {
      return Result.err(
        new DeletedRecordError('The specified book has already been deleted!')
      );
    }

    return Result.ok(
      await client.book.update({
        where: {
          id: data.bookId,
        },
        data: {
          ...updatedData,
        },
      })
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default update;
