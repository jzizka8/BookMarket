import { z } from 'zod';
import { Genre, Lang } from '../types/prismaTypes';

const langValues = Object.values(Lang) as [string, ...string[]];
const genreValues = Object.values(Genre) as [string, ...string[]];

const newBookSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  author: z.string().min(1, 'Author is required').max(100),
  yearOfPublication: z
    .string()
    .min(1, 'Year is required')
    .max(9999, 'Year must be less than or equal to 9999')
    .refine((value) => {
      if (value) {
        const parsedYear = parseInt(value);
        return value === parsedYear.toString();
      }
    }, 'Year must be a whole number'),
  price: z
    .string()
    .min(1, 'Price is required')
    .max(10)
    .refine((value) => /^\d+(\.\d{1,2})?$/.test(value), 'Invalid price format'),
  language: z.enum(langValues),
  genre: z.enum(genreValues),
  picture: z.unknown(),
});

export default newBookSchema;
