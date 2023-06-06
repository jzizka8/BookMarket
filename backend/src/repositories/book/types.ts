import type { Genre, Lang } from '@prisma/client';

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
