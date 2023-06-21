import { ApiResponse } from '../models/response';
import { ReadAllBooks } from '../types/ApiTypes';
import { NewBookSchemaType } from '../types/FormSchemaTypes';
import { Book } from '../types/prismaTypes';
import baseApi from './baseApi';

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

export const getBookDetail = async (bookId: string) => {
  const resp = await baseApi.get<ApiResponse<Book>>(`/book/${bookId}`);
  return resp.data;
};

export const fetchBooks = async (body:ReadAllBooks ) => {
  const response = await baseApi.post('/book/load', body);
  return response.data.data;
};