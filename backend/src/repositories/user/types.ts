import type { Result } from '@badrap/result';
import type { Book, Order, User } from '@prisma/client';

export type UserCreateData = {
  username: string;
  hashedPassword: string;
};

export type UserCreateResult = Promise<Result<User>>;

export type UserReadSpecificData = { userId: string };

export type UserReadSpecificResult = Promise<
  Result<{
    id: string;
    username: string;
    createdAt: Date;
    booksForSale: Book[];
    orders: Order[];
  }>
>;

export type UserReadLoginData = { username: string; hashedPassword: string };

export type UserReadLoginResult = Promise<
  Result<{
    id: string;
    username: string;
    createdAt: Date;
  }>
>;
