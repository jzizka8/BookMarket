import { z } from 'zod';
import registerFormSchema from '../schemas/RegisterFormSchema';
import loginFormSchema from '../schemas/LoginFormSchema';
import purchaseFormSchema from '../schemas/PurchaseFormSchema';
import filterSchema from '../schemas/FilterSchema';
import paymentInfoSchema from '../schemas/PaymentInfoSchema';

export type RegisterFormSchemaType = z.infer<typeof registerFormSchema>;
export type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
export type PurchaseFormSchemaType = z.infer<typeof purchaseFormSchema>;
export type PaymentInfoSchemaType = z.infer<typeof paymentInfoSchema>;
export type FilterSchemaType = z.infer<typeof filterSchema>;
export type NewBookSchemaType = {
  title: string;
  author: string;
  publicationYear: string;
  price: string;
  language: string;
  genre: string;
  photo?: File[];
  description?: string;
};

export type BookType = {
  title: string;
  author: string;
  yearOfPublication: string;
  price: string;
  language: string;
  genre: string;
  picture?: string;
};
