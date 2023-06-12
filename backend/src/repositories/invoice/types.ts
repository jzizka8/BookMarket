import type { Result } from '@badrap/result';
import type { Book, Invoice, User } from '@prisma/client';

type UserData = {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
};

type Address = {
  street: string;
  city: string;
  zipcode: string;
  country: string;
};

export type InvoiceCreateData = {
  userId: string;
  bookId: string[];
  amount: number;
  userData: UserData;
  address: Address;
};

export type InvoiceCreateResult = Promise<Result<Invoice & { buyer: User }>>;

export type InvoiceReadSpecificData = {
  userId: string;
};

export type InvoiceReadSpecificResult = Promise<
  Result<(Invoice & { books: Book[] })[] & { buyer: User }>
>;

export type InvoiceReadAllData = {
  id: string;
};

export type InvoiceReadAllResult = Promise<
  Result<
    Invoice & {
      buyer: {
        id: string;
        createdAt: Date;
        username: string;
      };
    }
  >
>;
