export type User = {
  id: string;
  createdAt: Date;
  username: string;
  hashedPassword: string;
  booksForSale?: Book[];
  invoices?: Invoice[];
};

export type Book = {
  id: string;
  createdAt: Date;
  deletedAt?: Date;
  category: Genre;
  soldBy: string;
  seller: User;
  invoice?: Invoice;
  title: string;
  author: string;
  price: number;
  publicationYear: number;
  language: Lang;
  photo?: string;
  description?: string;
};

export type Category = {
  id: string;
  name: Genre;
  books?: Book[];
};

export type Invoice = {
  id: string;
  createdAt: Date;
  buyerId: string;
  buyer: User;
  date: Date;
  amount: number;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  street: string;
  city: string;
  zipcode: string;
  country: string;
  books?: Book[];
};

type Address = {
  street: string;
  city: string;
  zipcode: string;
  country: string;
};

export type InvoiceCreateData = {
  userId: string;
  bookId: string[];
  amount: number;
  userData: User;
  address: Address;
};
export type Order = {
  id: string;
  createdAt: Date;
  shippingInfo: ShippingInfo;
  buyer: User;
  amount: number;
  books: Book[];
};

export type ShippingInfo = {
  id: string;
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  street: string;
  city: string;
  zipcode: string;
  country: string;
};

export enum Lang {
  CS = 'CS',
  DE = 'DE',
  EN = 'EN',
  ES = 'ES',
  FR = 'FR',
  SK = 'SK',
}

export enum Genre {
  Mystery = 'Mystery',
  Thriller = 'Thriller',
  YoungAdult = 'YoungAdult',
  Horror = 'Horror',
  Historical = 'Historical',
  Romance = 'Romance',
  ScienceFiction = 'ScienceFiction',
  Fantasy = 'Fantasy',
  Dystopian = 'Dystopian',
  Classical = 'Classical',
  Biography = 'Biography',
  Memoir = 'Memoir',
  Politics = 'Politics',
  SelfHelp = 'SelfHelp',
  Business = 'Business',
  Finance = 'Finance',
  ChildrensBooks = 'ChildrensBooks',
  Travel = 'Travel',
  Food = 'Food',
  Religion = 'Religion',
  LiteraryFiction = 'LiteraryFiction',
  NonFiction = 'NonFiction',
}
