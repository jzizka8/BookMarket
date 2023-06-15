import type { Result } from '@badrap/result';
import type { Book, Genre, Lang } from '@prisma/client';

export type BookCreateData = {
  title: string;
  author: string;
  price: number;
  publicationYear: number;
  language: Lang;
  genre: Genre;
  soldBy: string;
  photo: string | null;
  description: string | null;
};

export type BookDeleteData = {
  bookId: string;
};

export type BookReadSpecificData = {
  bookId: string;
};

export type BookUpdateData = {
  bookId: string;
  toUpdate: ToUpdate;
};

export type ToUpdate = {
  title?: string | undefined;
  author?: string | undefined;
  price?: number | undefined;
  publicationYear?: number | undefined;
  language?: Lang | undefined;
  categoryName?: Genre | undefined;
  photo?: string | undefined;
  description?: string | undefined;
};

export type BookGenericReturn = Promise<Result<Book>>;

export type BookReadAllReturn = Promise<Result<Book[]>>;
