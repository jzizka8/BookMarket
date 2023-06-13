import type { Result } from '@badrap/result';
import type { Book, Genre, Lang } from '@prisma/client';

export type BookCreateData = {
  title: string;
  author: string;
  price: number;
  publicationYear: number;
  language: Lang;
  categoryName: Genre;
  soldBy: string;
  photo: string | null;
  description: string | null;
};

export type BookDeleteData = {
  id: string;
};

export type BookReadSpecificData = {
  id: string;
};

export type BookUpdateData = {
  id: string;
  toUpdate: ToUpdate;
};

export type ToUpdate = {
  title?: string;
  author?: string;
  price?: number;
  publicationYear?: number;
  language?: Lang;
  categoryName?: Genre;
  photo?: string;
  description?: string;
};

export type BookGenericReturn = Promise<Result<Book>>;

export type BookReadAllReturn = Promise<Result<Book[]>>;