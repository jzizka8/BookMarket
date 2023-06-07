import { z } from 'zod';

const purchaseFormSchema = z.object({
  fullName: z.string().min(3, 'Full Name is required').max(100),
  shippingAddress: z.string().min(1, 'Shipping address is required').max(100),
  city: z.string().min(1, 'City is required').max(100),
  state: z.string().min(1, 'State is required').max(100),
  country: z.string().min(1, 'Country is required').max(100),
  zip: z
    .string()
    .min(5, 'ZIP code is required')
    .max(100)
    .refine((value) => /^\d+(\s\d+)?$/.test(value), {
      message: 'ZIP code must contain only numbers',
    }),
});

export default purchaseFormSchema;
