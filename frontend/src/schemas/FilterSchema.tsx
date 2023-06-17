import { z } from 'zod';
import { Genre } from '../types/prismaTypes';

const genreValues = Object.values(Genre) as [string, ...string[]];

const filterSchema = z
  .object({
    search: z.string().optional(),
    genre: z.enum([...genreValues, '']).default(''),
    minPrice: z
      .string()
      .regex(/^\d+$/)
      .transform((value) => (value ? parseInt(value) : undefined))
      .optional(),
    maxPrice: z
      .string()
      .regex(/^\d+$/)
      .transform((value) => (value ? parseInt(value) : undefined))
      .optional(),
  })
  .refine(
    (data) => {
      const { minPrice, maxPrice } = data;
      return (
        minPrice === undefined || maxPrice === undefined || minPrice <= maxPrice
      );
    },
    {
      message: 'Invalid price range',
      path: ['minPrice'],
    }
  );

export default filterSchema;
