import { Result } from '@badrap/result';
import client from '../client';
import type { BookCreateData, BookGenericReturn } from './types';
import { NonexistentRecordError } from '../types/errors';

/**
 * Repository call that creates a book.
 *
 * @param data object containing necessary data to create a new book record
 * @returns - On success: the created book record
 *          - On failure: a generic error
 */
const create = async (data: BookCreateData): BookGenericReturn => {
  try {
    const { categoryName, soldBy, ...bookData } = data;

    const category = await client.category.findUnique({
      where: {
        name: categoryName,
      },
    });

    if (!category) {
      return Result.err(
        new NonexistentRecordError('The specified category does not exist!')
      );
    }

    const user = await client.user.findUnique({
      where: {
        id: soldBy,
      },
    });

    if (!user) {
      return Result.err(
        new NonexistentRecordError('The specified user does not exist!')
      );
    }

    const book = await client.book.create({
      data: {
        ...bookData,
        category: {
          connect: {
            id: category.id,
          },
        },
        seller: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return Result.ok(book);
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default create;
