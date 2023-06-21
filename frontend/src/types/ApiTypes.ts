import { Genre } from './prismaTypes';

export type ReadAllBooks = {
  count?: number;
  offset?: number;
  genre?: string;
  max?: number;
  min?: number;
  searchInput?: string | null;
};
