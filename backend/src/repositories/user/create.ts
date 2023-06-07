import { Result } from '@badrap/result';
import client from '../client';
import { NotUniqueUsernameError } from './types/errors';
import type { UserCreateData, UserCreateResult } from './types';

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
    const user = client.user.findUnique({
      where: { username: data.username }
    })
    if (user !== null) {
      return Result.err(new NotUniqueUsernameError('The username is not unique!'));
    }
    return Result.ok(await client.user.create({
      data: {
        username: data.username,
        hashedPassword: data.hashedPassword,
      }
    }));
  } catch (e) {
    return Result.err(e as Error);
  }
}

export default create;
