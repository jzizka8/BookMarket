import { z } from 'zod';
import registerFormSchema from '../utils/formSchemas/RegisterFormSchema';
import loginFormSchema from '../utils/formSchemas/LoginFormSchema';

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;
export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
