import { Result } from '@badrap/result';
import client from '../client';
import type { BookCreateData, BookGenericReturn } from './types';

/**
 * Repository call that creates a book.
 *
 * @param data object containing necessary data to create a new book record
 * @returns - On success: the created book record
 *          - On failure: NotFoundError if category or user is not found
 *                        a generic error otherwise
 */
const create = async (data: BookCreateData): BookGenericReturn => {
  try {
    const { categoryName, soldBy, ...bookData } = data;

    const category = await client.category.findUniqueOrThrow({
      where: {
        name: categoryName,
      },
    });

    const user = await client.user.findUniqueOrThrow({
      where: {
        id: soldBy,
      },
    });

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
