import type { Request, Response } from 'express';
import delBook from '../../repositories/book/delete';
import { deleteSchema } from '../../schemas/bookSchemas';
import { loadFailedResponse, failResponse } from '../common';
import { DeletedRecordError } from '../../repositories/types/errors';

const deleteBook = async (req: Request, res: Response) => {
  try {
    // Validation
    const paramsValidate = deleteSchema.parse(req.params);

    // Repo call
    const book = await delBook(paramsValidate);

    // Checking repo answer and returning
    if (book.isErr) {
      const error = book.unwrap();
      if (error instanceof DeletedRecordError) {
        return loadFailedResponse(res, 'The book has already been deleted.')
      }
      return loadFailedResponse(res, 'The book does not exist.');
    }
    return res.status(200).send({
      data: book.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};

export default deleteBook;
