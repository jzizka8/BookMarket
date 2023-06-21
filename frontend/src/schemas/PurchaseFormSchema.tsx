import { z } from 'zod';

const purchaseFormSchema = z.object({
  name: z.string().min(2, 'First Name is required').max(100),
  surname: z.string().min(1, 'Surname is required').max(100),
  street: z.string().min(1, 'Shipping address is required').max(100),
  city: z.string().min(1, 'City is required').max(100),
  email: z.string().email(),
  phoneNumber: z.string().refine((value) => /^\+42\d{10}$/.test(value), {
    message: 'This is not a valid phone number.',
  }),
  country: z.string().min(1, 'Country is required').max(100),
  zipcode: z
    .string()
    .min(5, 'ZIP code is required')
    .max(7)
    .refine((value) => /^\d+(\s\d+)?$/.test(value), {
      message: 'ZIP code must contain only numbers',
    }),
});

export default purchaseFormSchema;
