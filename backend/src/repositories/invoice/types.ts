import type { Result } from "@badrap/result"
import type { Invoice, User } from "@prisma/client"

type UserData = {
  name: string,
  surname: string,
  email: string,
  phoneNumber: string
}

type Address = {
  street: string,
  city: string,
  zipcode: string,
  country: string
}

export type InvoiceCreateData = {
  userId: string,
  bookId: string[],
  amount: number,
  userData: UserData,
  address: Address
}

export type InvoiceCreateResult = Promise<Result<Invoice & {buyer: User}>>;

export type InvoiceReadSpecificData = {
  buyerId: string
}

export type InvoiceReadSpecificResult = Promise<Result<Invoice[] & {buyer: User}>>;