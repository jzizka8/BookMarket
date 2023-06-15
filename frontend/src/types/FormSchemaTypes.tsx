import { z } from 'zod';
import registerFormSchema from '../schemas/RegisterFormSchema';
import loginFormSchema from '../schemas/LoginFormSchema';
import purchaseFormSchema from '../schemas/PurchaseFormSchema';
import filterSchema from '../schemas/FilterSchema';

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;
export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
export type PurchaseFormSchemaType = z.infer<typeof purchaseFormSchema>;
export type FilterSchemaType = z.infer<typeof filterSchema>;
