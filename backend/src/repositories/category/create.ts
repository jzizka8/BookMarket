import { Result } from '@badrap/result';
import type { Category } from '@prisma/client';
import client from '../client';
import genericError from '../types';
import type { CategoryCreateData } from './types';

/**
 * Repository call that creates a category.
 *
 * @param data object containing necessary data to create a category
 * @returns - On success: the created category
 *          - On failure: a generic error
 */

const create = async (data: CategoryCreateData): Promise<Result<Category>> => {
  try {
    const category = await client.category.create({
      data: { ...data },
    });

    return Result.ok(category);
  } catch (e) {
    return genericError;
  }
};

export default create;
