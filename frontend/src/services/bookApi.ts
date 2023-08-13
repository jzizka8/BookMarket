import { ReadAllBooks } from '../types/ApiTypes';
import { NewBookSchemaType } from '../types/FormSchemaTypes';
import baseApi from './baseApi';
import { Book } from '../types/prismaTypes';

export const createBook = async (
  book: NewBookSchemaType,
  sellerId: string,
  photo: string
) => {
  const resp = await baseApi.post('/book', {
    ...book,
    soldBy: sellerId,
    photo: photo,
  });
  return resp.data;
};

export const updateBook = async (
  bookId: string,
  book: NewBookSchemaType,
  photo?: string
) => {
  const resp = await baseApi.patch(`/book/${bookId}`, {
    ...book,
    photo: photo,
  });
  return resp.data;
};

export const fetchBooks = async (body: ReadAllBooks) => {
  const response = await baseApi.post('/book/load', body);
  return response.data.data;
};

export const fetchBook = async (id: string): Promise<Book> => {
  const response = await baseApi.get(`/book/${id}`);
  return response.data.data;
};

export const deleteBook = async (id: string) => {
  const response = await baseApi.delete(`/book/${id}`, {
    withCredentials: true,
  });
  return response.data.data;
};
