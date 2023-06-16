/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Prisma, PrismaClient } from '@prisma/client';
import data from './data';

const client = new PrismaClient();

const seed = async () => {
  // Seeding users and categories first as they don't have any dependencies
  await client.user.createMany({ data: data.users });

  await client.shippingInfo.createMany({ data: data.shippingInfo });

  await Promise.all(
    data.orders.map((order) =>
      client.order.create({
        data: {
          ...order,
          buyer: { connect: { id: order.buyer.connect!.id! } },
          shippingInfo: { connect: { id: order.shippingInfo.connect!.id! } },
        },
      })
    )
  );

  await Promise.all(
    data.books.map(async (book) => {
      const bookData: Prisma.BookCreateInput = {
        ...book,
        seller: { connect: { id: book.seller.connect!.id! } },
      };

      if (book.order) {
        bookData.order = { connect: { id: book.order.connect!.id! } };
      }

      return client.book.create({ data: bookData });
    })
  );

  await client.$disconnect();
};

seed();
