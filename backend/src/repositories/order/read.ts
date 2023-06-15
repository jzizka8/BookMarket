import { Result } from '@badrap/result';
import type { Book, Order, User } from '@prisma/client';
import type {
  OrderReadAllData,
  OrderReadAllResult,
  OrderReadSpecificData,
  OrderReadSpecificResult,
} from './types';
import client from '../client';

/**
 * Repository call that reads data about all orders of specific user.
 *
 * @param   data  - buyer(user) id
 * @returns       - On success: Result.ok(Order[] & {buyer: User})
 *                - On failure: UserNotFound('User was not found.')
 *                              otherwise Result.err(_)
 */
export const allByUser = async (
  data: OrderReadSpecificData
): OrderReadSpecificResult => {
  try {
    const user = await client.user.findUniqueOrThrow({
      where: { id: data.userId },
    });

    const userOrders = await client.order.findMany({
      where: { buyerId: data.userId },
      include: { books: true },
    });

    const result = userOrders as (Order & { books: Book[] })[] & {
      buyer: User;
    };
    result.buyer = user;
    return Result.ok(
      userOrders as (Order & { books: Book[] })[] & { buyer: User }
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

/**
 * Repository call that reads data about a specific order.
 *
 * @param   data  - invoice id
 * @returns       - On success: Result.ok(Order & {buyer: User})
 *                - On failure: otherwise Result.err(_)
 */
export const specific = async (
  data: OrderReadAllData
): OrderReadAllResult => {
  try {
    return Result.ok(
      await client.order.findUniqueOrThrow({
        where: { id: data.orderId },
        include: {
          buyer: {
            select: {
              id: true,
              createdAt: true,
              username: true,
            },
          },
          books: true,
        },
      })
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};
