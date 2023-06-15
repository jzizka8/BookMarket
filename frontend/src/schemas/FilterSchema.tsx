import { z } from 'zod';
import { Genre } from '../types/prismaTypes';

const genreValues = Object.values(Genre) as [string, ...string[]];

const filterSchema = z
  .object({
    genre: z.enum(genreValues).optional(),
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
      message:
        'Invalid price range: Minimum price cannot be greater than maximum price',
      path: ['minPrice'],
    }
  );

export default filterSchema;
