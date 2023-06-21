import { z } from 'zod';
import { Genre, Lang } from '../types/prismaTypes';

const langValues = Object.values(Lang) as [string, ...string[]];
const genreValues = Object.values(Genre) as [string, ...string[]];

const newBookSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  author: z.string().min(1, 'Author is required').max(100),
  publicationYear: z.coerce
    .number()
    .min(1, 'Year is required')
    .max(9999, 'Year must be less than or equal to 9999'),
  price: z.coerce.number().multipleOf(0.01),
  language: z.enum(langValues),
  genre: z.enum(genreValues),
  photo: z.unknown(),
  description: z.string().optional(),
});

export default newBookSchema;
