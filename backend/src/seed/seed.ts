/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PrismaClient } from '@prisma/client';
import data from './data';

const client = new PrismaClient();

const seed = async () => {
  // Seeding users and categories first as they don't have any dependencies
  await client.user.createMany({ data: data.users });
  await client.category.createMany({ data: data.categories });

  const books = await Promise.all(
    data.books.map((book) =>
      client.book.create({
        data: {
          ...book,
          category: {
            connect: { id: book.category.connect!.id! },
          },
          seller: {
            connect: { id: book.seller.connect!.id! },
          },
        },
      })
    )
  );

  await Promise.all(
    data.invoices.map((invoice) =>
      client.invoice.create({
        data: {
          ...invoice,
          buyer: { connect: { id: invoice.buyer.connect!.id! } },
          books: {
            connect: books.map((book) => ({ id: book.id })),
          },
        },
      })
    )
  );

  await client.$disconnect();
};

seed();
