import { z } from 'zod';

const paymentInfoSchema = z.object({
  cardNumber: z.string().refine((value) => /^\d{16}$/.test(value), {
    message: 'Card number is required and must be 16 digits',
  }),
  expirationDate: z
    .string()
    .refine((value) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(value), {
      message: 'Expiration date is required and must be in format MM/YY',
    }),
  cvv: z.string().refine((value) => /^\d{3}$/.test(value), {
    message: 'CVV is required and must be 3 digits',
  }),
  name: z
    .string()
    .min(1, 'Name is required')
    .max(100)
    .refine((value) => /^[\p{L}\s]+$/u.test(value), {
      message: 'Name is required and must only contain letters and spaces',
    }),
});

export default paymentInfoSchema;
