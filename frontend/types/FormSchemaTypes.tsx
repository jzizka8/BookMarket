import { z } from 'zod';
import registerFormSchema from '../src/schemas/RegisterFormSchema';
import loginFormSchema from '../src/schemas/LoginFormSchema';

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;
export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
