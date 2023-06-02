/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Prisma, PrismaClient } from '@prisma/client';
import data from './data';

const client = new PrismaClient();

const seed = async () => {
  // Seeding users and categories first as they don't have any dependencies
  await client.user.createMany({ data: data.users });
  await client.category.createMany({ data: data.categories });

  await Promise.all(
    data.invoices.map((invoice) =>
      client.invoice.create({
        data: {
          ...invoice,
          buyer: { connect: { id: invoice.buyer.connect!.id! } },
        },
      })
    )
  );

  await Promise.all(
    data.books.map(async (book) => {
      const bookData: Prisma.BookCreateInput = {
        ...book,
        category: { connect: { id: book.category.connect!.id! } },
        seller: { connect: { id: book.seller.connect!.id! } },
      };

      if (book.invoice) {
        bookData.invoice = { connect: { id: book.invoice.connect!.id! } };
      }

      return client.book.create({ data: bookData });
    })
  );

  await client.$disconnect();
};

seed();
