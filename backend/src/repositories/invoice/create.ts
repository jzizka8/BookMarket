import { Result } from "@badrap/result";
import prisma from "../client";
import { specific } from "../user/read";
import type { InvoiceCreateData, InvoiceCreateResult } from "./types";
import { UserNotFound } from "./types/errors";

/**
 * Repository call that creates a Invoice.
 *
 * @param data - containing necessary data to create a new invoice record
 * @returns - Result.ok(Invoice &{ Buyer: User }) on success
 *          - UserNotFound if the user don't exist
 *          - Result.err(_) otherwise
 */
const create = async (data: InvoiceCreateData): InvoiceCreateResult => {
  try {

    const { userData, address, ...invoiceData } = data;

    const user = await specific({ id: data.userId });
    if (user.isErr) {
      return Result.err(new UserNotFound('User with this id does not exist!'));
    }

    const books = await prisma.book.findMany({
      where: {
        id: {
          in: data.bookId
        }
      }
    })

    const invoice = await prisma.invoice.create({
      data: {
        buyerId: invoiceData.userId,
        amount: invoiceData.amount,
        name: userData.name,
        surname: userData.surname,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        street: address.street,
        city: address.city,
        zipcode: address.zipcode,
        country: address.country,
        books: {
          connect: books.map((book) => ({ id: book.id })),
        }
      },
      include: {
        buyer: true
      },
    }
    );

    return Result.ok(invoice);

  } catch (e) {
    return Result.err(e as Error);
  }
}

export default create;