import { z } from 'zod';

export const signInSchema = z.object({
  username: z.string().min(1, 'Username is required').max(100),
  hashedPassword: z.string()
}).strict();

export const specificSchema = z.object({
  id: z.string().min(1),
})
