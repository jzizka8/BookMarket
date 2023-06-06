import type { Result } from '@badrap/result';
import type { Book, Category, Genre } from '@prisma/client';

export type CategoryCreateData = {
  name: Genre;
};

export type CategoryReadSpecificData = {
  name: Genre;
};

export type CategoryWithBooks = Category & {
  books: Book[];
};

export type CategoryGenericReturn = Promise<Result<Category>>;

export type CategoryReadSpecificReturn = Promise<Result<CategoryWithBooks>>;

export type CategoryReadAllReturn = Promise<Result<Category[]>>;
