import { Result } from '@badrap/result';
import client from '../client';
import type { UserCreateData, UserCreateResult } from './types';
import { ConflictingRecordError } from '../types/errors';

/**
 * Repository call that creates a User.
 *
 * @param data - username
 *             - hashedPassword
 * @returns - Result.ok({ User }) on success
 *          - NotUniqueUsernameError if the username is not unique
 *          - Result.err(_) otherwise
 */
const create = async (data: UserCreateData): UserCreateResult => {
  try {
    const duplicate = await client.user.findUnique({
      where: { username: data.username },
    });

    if (duplicate !== null){
      return Result.err(new ConflictingRecordError());
    }

    const user = await client.user.create({
      data: {
        username: data.username,
        hashedPassword: data.hashedPassword,
      },
    });

    return Result.ok(user);
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default create;
