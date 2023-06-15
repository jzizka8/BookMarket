import { Result } from '@badrap/result';
import client from '../client';
import type {
  UserReadLoginData,
  UserReadLoginResult,
  UserReadSpecificData,
  UserReadSpecificResult,
} from './types';
import { WrongOwnershipError } from '../types/errors';

/**
 * Repository call that reads data about a specific user.
 * The books and orders are by default ordered by its `createdAt`
 * property in descending order.
 *
 * @param   data  - user id
 * @returns       - On success: Result.ok(User & { Book[], Order[] })
 *                - On failure: Result.err(_)
 */
export const specific = async (
  data: UserReadSpecificData
): UserReadSpecificResult => {
  try {
    return Result.ok(
      await client.user.findUniqueOrThrow({
        where: { id: data.userId },
        select: {
          id: true,
          createdAt: true,
          username: true,
          booksForSale: {
            where: { deletedAt: null },
            orderBy: { createdAt: 'desc' },
          },
          orders: {
            orderBy: { createdAt: 'desc' },
          },
        },
      })
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

/**
 * Repository call that reads data about a specific user.
 * The books are by default ordered by its `createdAt` property
 * in descending order.
 *
 * @param   data  - username, hashedPassword
 * @returns       - On success: Result.ok(User)
 *                - On failure: Result.err(_)
 */
export const login = async (data: UserReadLoginData): UserReadLoginResult => {
  try {
    const user = await client.user.findUniqueOrThrow({
      where: { username: data.username },
    });

    if (user.hashedPassword !== data.hashedPassword) {
      return Result.err(new WrongOwnershipError(`Password don't match with user - ${user.username}.`));
    }

    const userToReturn = {
      id: user.id,
      username: user.username,
      createdAt: user.createdAt,
    };

    return Result.ok(userToReturn);
  } catch (e) {
    return Result.err(e as Error);
  }
};
