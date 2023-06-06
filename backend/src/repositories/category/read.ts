import { Result } from '@badrap/result';
import type { Category } from '@prisma/client';
import type {
  CategoryReadSpecificData,
  CategoryWithBooks,
} from './types/types';
import client from '../client';
import genericError from '../types';
import { NonexistentRecordError } from './types/errors';

/**
 * Repository call that reads data about a specific category.
 * The books are by default ordered by its `createdAt` property
 * in descending order.
 *
 * Special cases for an error (returned error type and message):
 *
 * - NonexistentRecordError('The specified category does not exist!')
 *
 * Otherwise: a generic error.
 *
 * @param data object containing a name of the category
 * @returns - On success: Category and its books
 *          - On failure: Either a special error (mentioned earlier), or a
 *                        generic error
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
    return genericError;
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
    return genericError;
  }
};
