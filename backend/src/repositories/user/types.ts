import type { Result } from '@badrap/result';
import type { Book, Invoice, User } from '@prisma/client';

export type UserCreateData = {
  username: string;
  hashedPassword: string;
};

export type UserCreateResult = Promise<Result<User>>;

export type UserReadSpecificData = { id: string };

export type UserReadSpecificResult = Promise<
  Result<
    User & {
      booksForSale: Book[];
      invoices: Invoice[];
    }
  >
>;

export type UserReadLoginData = { username: string; hashedPassword: string };

export type UserReadLoginResult = Promise<Result<User>>;
