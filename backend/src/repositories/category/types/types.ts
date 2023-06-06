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
