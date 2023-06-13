import { z } from 'zod';
import registerFormSchema from '../src/schemas/RegisterFormSchema';
import loginFormSchema from '../src/schemas/LoginFormSchema';
import newBookSchema from '../src/schemas/NewBookSchema';

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;
export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
export type NewBookSchemaType = z.infer<typeof newBookSchema>;
