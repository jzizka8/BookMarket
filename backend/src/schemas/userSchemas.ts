import { z } from 'zod';

export const userRegistrationScheme = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
  })
  .strict();

export const userLoginScheme = z.object({
  username: z.string(),
  password: z.string().min(8),
});
