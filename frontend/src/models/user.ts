import { Book, Order } from "../types/prismaTypes";

export type User = {
  id: string;
  username: string;
  createdAt: Date;
  booksForSale: Book[];
  orders: Order[]
};
