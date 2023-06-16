import type { Request, Response } from 'express';
import { loadFailedResponse, failResponse } from '../common';
import createBook from '../../repositories/book/create';
import { createBodySchema } from '../../schemas/bookSchemas';
import { DeletedRecordError } from '../../repositories/types/errors';

const create = async (req: Request, res: Response) => {
  try {
    // Validation
    const bodyValidate = await createBodySchema.parseAsync(req.body);
    // Repo call
    const book = await createBook(bodyValidate);

    // Checking repo answer and returning
    if (book.isErr) {
      const error = book.unwrap();
      if (error instanceof DeletedRecordError) {
        return loadFailedResponse(res, 'The book does not exist');
      }
      return loadFailedResponse(res, 'The book can not be created.');
    }
    return res.status(201).send({
      data: book.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};

export default create;
