import { z } from 'zod';
import { getYear } from 'date-fns';
import { Genre, Lang } from '@prisma/client';

export const createBodySchema = z.object({
  title: z
    .string()
    .min(2, 'Title of book should be at least 2 characters long.'),
  author: z
    .string()
    .min(2, 'Author of book should has name at least 2 characters long.'),
  price: z
    .number()
    .nonnegative('Price has to be greater or equal to zero.')
    .refine((x) => x * 100 - Math.trunc(x * 100) < Number.EPSILON), // price is a float with 2 decimal points
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
  categoryName: z.nativeEnum(Genre),
  photo: z.string().nullable(),
  description: z.string().nullable(),
});

export const createParamsSchema = z.object({
  soldBy: z.string().nonempty(),
});

export const deleteSchema = z.object({
  id: z.string().nonempty(),
});

export const specificSchema = z.object({
  id: z.string().nonempty(),
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
      .refine(
        (x) => x === undefined || x * 100 - Math.trunc(x * 100) < Number.EPSILON
      ),
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
    categoryName: z.nativeEnum(Genre).optional(),
    photo: z.string().optional(),
    description: z.string().optional(),
  })
  .strict();

export const updateParamsSchema = z.object({
  id: z.string().nonempty(),
});
