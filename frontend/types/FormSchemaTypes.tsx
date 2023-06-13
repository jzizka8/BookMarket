import { z } from 'zod';
import registerFormSchema from '../src/schemas/RegisterFormSchema';
import loginFormSchema from '../src/schemas/LoginFormSchema';
import newBookSchema from '../src/schemas/NewBookSchema';
import paymentInfoSchema from '../src/schemas/PaymentInfoSchema';

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;
export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
export type NewBookSchemaType = z.infer<typeof newBookSchema>;
export type PaymentInfoSchemaType = z.infer<typeof paymentInfoSchema>;
