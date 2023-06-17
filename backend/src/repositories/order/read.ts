import { Result } from '@badrap/result';
import type { OrderReadSpecificData, OrderReadSpecificResult } from './types';
import client from '../client';

/**
 * Repository call that reads data about a specific order.
 *
 * @param   data  - order id
 * @returns       - On success: Result.ok(Order & {buyer: User})
 *                - On failure: otherwise Result.err(_)
 */
const specific = async (
  data: OrderReadSpecificData
): OrderReadSpecificResult => {
  try {
    return Result.ok(
      await client.order.findUniqueOrThrow({
        where: { id: data.orderId },
        include: {
          shippingInfo: true,
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

export default specific;
