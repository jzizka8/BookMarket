import { ApiResponse } from '../models/response';
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

export const getBookDetail = async (bookId: string) => {
  const resp = await baseApi.get<ApiResponse<Book>>(`/book/${bookId}`);
  return resp.data;
};
