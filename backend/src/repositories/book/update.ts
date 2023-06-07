import { Result } from '@badrap/result';
import client from '../client';
import type { BookGenericReturn, BookUpdateData } from './types';
import { DeletedRecordError, NonexistentRecordError } from '../types/errors';

/**
 * Repository call that updates the book's data.
 *
 *
 * @param data object containing the book id and fields to be updated
 * @returns - On success: An updated book record
 *          - On failure: NonExistentRecordError if the book does not exist
 *                        DeletedRecordError if the book was already deleted
 *                        generic error otherwise
 */
const update = async (data: BookUpdateData): BookGenericReturn => {
  try {
    const updatedData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== undefined)
    );

    const book = await client.book.findUnique({
      where: {
        id: data.id,
      },
    });

    if (!book) {
      return Result.err(
        new NonexistentRecordError('The specified book does not exist!')
      );
    }

    if (book.deletedAt) {
      return Result.err(
        new DeletedRecordError('The specified book has already been deleted!')
      );
    }

    const employeeUpdated = await client.$transaction(async (tx) => {
      return tx.book.update({
        where: {
          id: data.id,
        },
        data: updatedData,
      });
    });

    return Result.ok(employeeUpdated);
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default update;
