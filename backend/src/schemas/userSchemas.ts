import { z } from 'zod';

export const createSchema = z.object({
  username: z.string().min(1, 'Username is required').max(100),
  hashedPassword: z.string()
    .min(8, 'Password must have more than 8 characters'),
}).strict();
