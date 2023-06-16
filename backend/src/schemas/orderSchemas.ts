import { z } from 'zod';

const shippingInfoSchema = z.object({
  name: z
    .string()
    .min(
      2,
      "We are sorry if you have name which is less than 2 characters long, but we don't support that."
    ),
  surname: z.string().nonempty(),
  email: z.string().email('This is not valid email.'),
  phoneNumber: z
    .string()
    .regex(/^\+42\d{10}$/, 'This is not valid phone number.'),
  street: z.string().nonempty(),
  city: z.string().nonempty(),
  zipcode: z.string().length(5, 'ZIP Codes are usually 5 characters long.'),
  country: z.string().min(4, 'Shortest country name has 4 characters.'),
});

export const createBodySchema = z.object({
  bookId: z.array(z.string().min(1)),
  amount: z.number().positive(),
  shippingData: shippingInfoSchema,
});

export const createParamsSchema = z.object({
  userId: z.string().nonempty(),
});

export const allSchema = z.object({
  userId: z.string().min(1),
});

export const specificSchema = z.object({
  orderId: z.string().min(1),
});
