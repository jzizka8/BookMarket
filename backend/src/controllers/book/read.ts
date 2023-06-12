import type { Request, Response } from 'express';
import { specificSchema } from '../../schemas/bookSchemas';
import { all, specific } from '../../repositories/book/read';
import { loadFailedResponse, failResponse } from '../common';

export const specificBook = async (req: Request, res: Response) => {
  try {
    // Validation
    const paramsValidate = specificSchema.parse(req.params);

    // Repo call
    const book = await specific(paramsValidate);

    // Checking repo answer and returning
    if (book.isErr) {
      return loadFailedResponse(res, 'The entity does not exist.');
    }
    return res.status(200).send({
      data: book.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};

// Since we're not using any parameters for this call, I'll just leave out the req
export const allBooks = async (_: Request, res: Response) => {
  try {
    const books = await all();

    // Checking repo answer and returning
    if (books.isErr) {
      return loadFailedResponse(res, 'The entity does not exist.');
    }
    return res.status(200).send({
      data: books.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};
