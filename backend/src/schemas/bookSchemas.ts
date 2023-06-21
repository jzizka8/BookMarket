import { z } from 'zod';
import { getYear } from 'date-fns';
import { Genre, Lang } from '@prisma/client';

export const createBodySchema = z.object({
  soldBy: z.string().min(1),
  title: z
    .string()
    .min(2, 'Title of book should be at least 2 characters long.'),
  author: z
    .string()
    .min(2, 'Author of book should has name at least 2 characters long.'),
  price: z
    .number()
    .nonnegative('Price has to be greater than zero.')
    .refine((val) => {
      const decimalPart = (val.toString().split('.')[1] || '').length;
      return decimalPart <= 2; // Allow up to 2 decimal places
    }), // price is a float with 2 decimal points
  publicationYear: z
    .number()
    .lte(
      getYear(new Date()),
      'Are we in the future? Wrong year of publication.'
    )
    .nonnegative(
      "Old Testament or Epic of Gilgamesh? If so, write 'publication year' as 0."
    ),
  language: z.nativeEnum(Lang),
  genre: z.nativeEnum(Genre),
  photo: z.string().url().nullable(),
  description: z.string().nullable(),
});

export const createParamsSchema = z.object({
  soldBy: z.string().nonempty(),
});

export const deleteSchema = z.object({
  bookId: z.string().nonempty(),
});

export const specificSchema = z.object({
  bookId: z.string().nonempty(),
});

export const updateBodySchema = z
  .object({
    title: z
      .string()
      .min(2, 'Title of book should be at least 2 characters long.')
      .optional(),
    author: z
      .string()
      .min(2, 'Author of book should has name at least 2 characters long.')
      .optional(),
    price: z
      .number()
      .nonnegative('Price has to be greater or equal to zero.')
      .optional()
      .refine((val) => {
        if (val === undefined) {
          return true;
        }
        const decimalPart = (val.toString().split('.')[1] || '').length;
        return decimalPart <= 2; // Allow up to 2 decimal places
      }),
    publicationYear: z
      .number()
      .lte(
        getYear(new Date()),
        'Are we in the future? Wrong year of publication.'
      )
      .nonnegative(
        "Old Testament or Epic of Gilgamesh? If so, write 'publication year' as 0."
      )
      .optional(),
    language: z.nativeEnum(Lang).optional(),
    genre: z.nativeEnum(Genre).optional(),
    photo: z.string().url().optional(),
    description: z.string().optional(),
  })
  .strict();

export const updateParamsSchema = z.object({
  bookId: z.string().nonempty(),
});

export const readAllParamasSchema = z.object({
  count: z.number().positive().default(5),
  offset: z.number().nonnegative().default(0),
  genre: z.nativeEnum(Genre).optional(),
  max: z
    .number()
    .nonnegative()
    .default(Number.MAX_SAFE_INTEGER)
    .refine((val) => {
      if (val === undefined) {
        return true;
      }
      const decimalPart = (val.toString().split('.')[1] || '').length;
      return decimalPart <= 2; // Allow up to 2 decimal places
    }),
  min: z
    .number()
    .nonnegative()
    .default(0)
    .refine((val) => {
      if (val === undefined) {
        return true;
      }
      const decimalPart = (val.toString().split('.')[1] || '').length;
      return decimalPart <= 2; // Allow up to 2 decimal places
    }),
  searchInput: z.string().nonempty().optional(),
  userId: z.string().nonempty().optional(),
});
