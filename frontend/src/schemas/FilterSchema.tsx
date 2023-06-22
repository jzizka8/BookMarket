import { z } from 'zod';
import { Genre } from '../types/prismaTypes';

const genreValues = Object.values(Genre) as [string, ...string[]];

const filterSchema = z
  .object({
    searchInput: z.string().optional(),
    genre: z.enum([...genreValues, '']).optional(),
    min: z
      .string()
      .transform((value) => (value ? parseInt(value) : 0))
      .optional(),
    max: z
      .string()
      .transform((value) => (value ? parseInt(value) : undefined))
      .optional(),
  })
  .refine(
    (data) => {
      const { min, max } = data;
      return min === undefined || max === undefined || min <= max;
    },
    {
      message: 'Invalid price range',
      path: ['min'],
    }
  );

export default filterSchema;
