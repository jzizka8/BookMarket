import { z } from "zod"

const userData = z.object({
  name: z.string()
  .min(2, "We are sorry if you have name which is less than 2 characters long, but we don't support that."),
  city: z.string().nonempty(),
  zipcode: z.string().length(5, "ZIP Codes are usually 5 characters long."),
  contry: z.string().min(4, "Shortest country name has 4 characters.")
})

const address = z.object({
  street: z.string().nonempty(),
  city: z.string().nonempty(),
  email: z.string().email("This is not valid email."),
  phoneNumber: z.string()
  .regex(new RegExp('/^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/'),
  "This is not valid phone number.")
})

export const createBodySchema = z.object({
  bookId: z.array(z.string().min(1)),
  amount: z.number().nonnegative(),
  userData,
  address,
})

export const createParamsSchema = z.object({
  userId: z.string().nonempty()
})