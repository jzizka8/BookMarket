import { Result } from "@badrap/result";
import type { InvoiceReadSpecificData, InvoiceReadSpecificResult } from "./types";
import { specific as specificUser } from "../user/read";
import { UserNotFound } from "./types/errors";
import prisma from "../client";
import type { Invoice, User } from "@prisma/client";

/**
 * Repository call that reads data about a specific user.
 * The books and invoices are by default ordered by its `createdAt`
 *  property in descending order.
 *
 * @param   data  - user id
 * @returns       - On success: Result.ok(User & { Book[], Invoice[] })
 *                - On failure: Result.err(_)
 */
export const specific = async (data: InvoiceReadSpecificData): InvoiceReadSpecificResult => {
  try {
    const user = await specificUser({ id: data.buyerId });
    if (user.isErr) {
      return Result.err(new UserNotFound('User was not found.'));
    }
    const { booksForSale, invoices, ...userEntity } = user.unwrap();
    const userInvoices = await prisma.invoice.findMany({
      where: { buyerId: data.buyerId },
    });

    const result = userInvoices as Invoice[] & { buyer: User };
    result.buyer = userEntity;
    return Result.ok(userInvoices as Invoice[] & { buyer: User });

  } catch (e) {
    return Result.err(e as Error);
  }
}