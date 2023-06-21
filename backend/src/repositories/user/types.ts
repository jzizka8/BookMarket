import type { Result } from '@badrap/result';
import type { Book, Order } from '@prisma/client';

export type UserCreateData = {
  username: string;
  password: string;
};

export type UserRegisterResult = Promise<
  Result<{ id: string; username: string }>
>;

export type UserReadSpecificData = { username: string };

export type UserReadSpecificResult = Promise<
  Result<{
    id: string;
    username: string;
    createdAt: Date;
    booksForSale: Book[];
    orders: Order[];
  }>
>;

export type UserReadLoginData = { username: string; password: string };

export type UserReadLoginResult = Promise<
  Result<{
    id: string;
    username: string;
    createdAt: Date;
  }>
>;
