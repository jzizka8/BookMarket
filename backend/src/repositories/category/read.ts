import { Result } from '@badrap/result';
import type { Category } from '@prisma/client';
import type { CategoryReadSpecificData, CategoryWithBooks } from './types';
import client from '../client';
import { NonexistentRecordError } from '../types/errors';

/**
 * Repository call that reads data about a specific category.
 * The books are by default ordered by its `createdAt` property
 * in descending order.
 *
 *
 * @param data object containing a name of the category
 * @returns - On success: Category and its books
 *          - On failure: NonexistentRecordError if the category does not exist
 *                        generic error otherwise
 */
export const specific = async (
  data: CategoryReadSpecificData
): Promise<Result<CategoryWithBooks>> => {
  try {
    return await client.$transaction(async (tx) => {
      const category = await tx.category.findUnique({
        where: { name: data.name },
        include: {
          books: {
            orderBy: {
              createdAt: 'desc',
            },
          },
        },
      });

      if (!category) {
        return Result.err(
          new NonexistentRecordError('The specified category does not exist!')
        );
      }

      return Result.ok(category);
    });
  } catch (e) {
    return Result.err(e as Error);
  }
};

/**
 * Repository call that reads data of all categories.
 *
 * @param data object containing a name of the category
 * @returns - On success: All categories (without books)
 *          - On failure: A generic error
 */
export const all = async (): Promise<Result<Category[]>> => {
  try {
    const result = await client.category.findMany();

    return Result.ok(result);
  } catch (e) {
    return Result.err(e as Error);
  }
};
