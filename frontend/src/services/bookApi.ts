import { NewBookSchemaType } from "../types/FormSchemaTypes";
import baseApi from "./baseApi";

export const createBook = async  (book: NewBookSchemaType, sellerId: string, photo: string) => {
    console.log({...book, soldBy: sellerId, photo: photo});
    const resp = await baseApi.post('/book', {...book, soldBy: sellerId, photo: photo});
    return resp.data;
  };