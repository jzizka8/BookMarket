import { Genre, Prisma } from '@prisma/client';

interface SeedData {
  users: Prisma.UserCreateInput[];
  books: Prisma.BookCreateInput[];
  categories: Prisma.CategoryCreateInput[];
  invoices: Prisma.InvoiceCreateInput[];
}

const data: SeedData = {
  users: [
    {
      id: '5452fa3f-7a0c-4463-96f8-3c86476f58b8',
      username: 'joe26',
      hashedPassword: '081d6e498fabb341f5d06ed1f83d089d',
    },
    {
      id: '6cc89641-7005-4b71-aab0-0ac022b0ce28',
      username: 'lynn48',
      hashedPassword: '4452902494b3b9362fc54a330e49db02',
    },
    {
      id: '5df68034-f059-4703-baf5-1fb4657a1adc',
      username: 'william',
      hashedPassword: 'fd820a2b4461bddd116c1518bc4b0f77',
    },
  ],
  books: [
    {
      id: '518028f7-9ab5-437d-b4a4-1db640c69eda',
      deletedAt: null,
      category: { connect: { id: 'category1-uuid' } },
      seller: { connect: { id: '5452fa3f-7a0c-4463-96f8-3c86476f58b8' } },
      name: 'Happy Place',
      author: 'Emily Henry',
      price: 18.9,
      publicationYear: 2023,
      language: 'EN',
      photo: 'https://mrtns.sk/tovar/_xl/1663/xl1663909.jpg',
      description:
        'The fourth swoon-worthy rom com from New York and Sunday Times bestselling TikTok sensation Emily Henry',
    },
    {
      id: '85f850fc-07c6-4a8d-bffe-6d6e27a53453',
      deletedAt: null,
      category: { connect: { id: 'category3-uuid' } },
      seller: { connect: { id: '5452fa3f-7a0c-4463-96f8-3c86476f58b8' } },
      name: 'Fourth Wing',
      author: 'Rebecca Yarros',
      price: 35.9,
      publicationYear: 2023,
      language: 'EN',
      photo: 'https://mrtns.sk/tovar/_xl/1899/xl1899569.jpg',
      description: 'A fantasy book about dragons.',
    },
    {
      id: '387deb3b-2fa9-48b4-bef1-0023f64e7cb3',
      deletedAt: new Date(),
      category: { connect: { id: 'category7-uuid' } },
      seller: { connect: { id: '6cc89641-7005-4b71-aab0-0ac022b0ce28' } },
      name: 'Krv nie je voda',
      author: 'Dominik Dán',
      price: 12.9,
      publicationYear: 2015,
      language: 'SK',
      photo: 'https://mrtns.sk/tovar/_xl/214/xl214712.jpg',
    },
  ],
  categories: Object.values(Genre).map((genre, index) => ({
    id: `category${index + 1}-uuid`,
    name: genre,
  })),
  invoices: [
    {
      id: '46808aed-cca9-4860-b69d-bfe56852f170',
      buyer: { connect: { id: '5df68034-f059-4703-baf5-1fb4657a1adc' } },
      date: new Date(),
      amount: 20.0,
      name: 'William',
      surname: 'Harrington',
      email: 'william@email.com',
      phoneNumber: '+421999008007',
      street: 'Ulica',
      city: 'Mesto',
      zipcode: '04028',
      country: 'Slovakia',
      books: {
        connect: [{ id: '518028f7-9ab5-437d-b4a4-1db640c69eda' }],
      },
    },
  ],
};

export default data;
