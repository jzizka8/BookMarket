import { Result } from '@badrap/result';
import client from '../client';
import type { CategoryCreateData, CategoryGenericReturn } from './types';
import { ConflictingRecordError } from '../types/errors';

/**
 * Repository call that creates a category.
 *
 * @param data object containing necessary data to create a category
 * @returns - On success: the created category
 *          - On failure: ConflictingRecordError if category with given name already exists
 *                        a generic error
 */

const create = async (data: CategoryCreateData): CategoryGenericReturn => {
  try {
    const existingCategory = await client.category.findFirst({
      where: {
        name: data.name,
      },
    });

    if (existingCategory) {
      return Result.err(
        new ConflictingRecordError(
          'Category with the given name already exists'
        )
      );
    }

    const category = await client.category.create({
      data: { ...data },
    });

    return Result.ok(category);
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default create;
