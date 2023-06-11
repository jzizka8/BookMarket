import type { Request, Response } from 'express';
import { specificSchema } from '../../schemas/bookSchemas';
import { all, specific } from '../../repositories/book/read';
import { loadFailedResponse, failResponse } from '../common';

export const specificBook = async (req: Request, res: Response) => {
  try {
    // Validation
    const bodyValidate = specificSchema.parse(req.params);

    // Repo call
    const book = await specific(bodyValidate);

    // Checking repo answer and returning
    if (book.isErr) {
      return loadFailedResponse(res);
    }
    return res.status(201).send({
      data: book.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};

// Since we're not using any parameters for this call, I'll just leave out the req
export const allBooks = async (res: Response) => {
  try {
    const books = await all();

    // Checking repo answer and returning
    if (books.isErr) {
      return loadFailedResponse(res);
    }
    return res.status(201).send({
      data: books.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};
