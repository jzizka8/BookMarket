import type { Result } from '@badrap/result';
import type { Book, Order, User } from '@prisma/client';

type ShippingData = {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  street: string;
  city: string;
  zipcode: string;
  country: string;
};

export type OrderCreateData = {
  userId: string;
  bookId: string[];
  amount: number;
  shippingData: ShippingData;
};

export type OrderCreateResult = Promise<
  Result<
    Order & {
      shippingInfo: ShippingData;
      buyer: {
        id: string;
        createdAt: Date;
        username: string;
      };
    }
  >
>;

export type OrderReadSpecificData = {
  orderId: string;
};

export type OrderReadSpecificResult = Promise<
  Result<
    Order & {
      shippingInfo: ShippingData;
      buyer: {
        id: string;
        createdAt: Date;
        username: string;
      };
    }
  >
>;
