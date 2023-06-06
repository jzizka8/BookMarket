import { z } from 'zod';

const loginFormSchema = z.object({
  username: z.string().min(1, 'Username is required').max(100),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have more than 8 characters'),
});

export default loginFormSchema;
