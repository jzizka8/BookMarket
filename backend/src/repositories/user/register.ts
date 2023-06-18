import { Result } from '@badrap/result';
import argon2 from 'argon2';
import client from '../client';
import type { UserCreateData, UserRegisterResult } from './types';
import { ConflictingRecordError } from '../types/errors';

/**
 * Repository call that creates a User.
 *
 * @param data - username
 *             - password
 * @returns - Result.ok({ User }) on success
 *          - NotUniqueUsernameError if the username is not unique
 *          - Result.err(_) otherwise
 */
const register = async (data: UserCreateData): UserRegisterResult => {
  try {
    const duplicate = await client.user.findUnique({
      where: { username: data.username },
    });

    if (duplicate !== null) {
      return Result.err(new ConflictingRecordError());
    }

    const hash = await argon2.hash(data.password);

    const user = await client.user.create({
      data: {
        username: data.username,
        hashedPassword: hash,
      },
      select: {
        id: true,
        username: true,
      },
    });

    return Result.ok(user);
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default register;
