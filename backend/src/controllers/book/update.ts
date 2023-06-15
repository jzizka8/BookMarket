import type { Request, Response } from 'express';
import { /* loadFailedResponse, */ failResponse, loadFailedResponse } from '../common';
import {
  updateBodySchema,
  updateParamsSchema,
} from '../../schemas/bookSchemas';
import update from '../../repositories/book/update';
import { ConflictingRecordError, DeletedRecordError } from '../../repositories/types/errors';

const updateBook = async (req: Request, res: Response) => {
  try {
    // Validation
    const [paramsValidate, bodyValidate] = await Promise.all([
      updateParamsSchema.parseAsync(req.params),
      updateBodySchema.parseAsync(req.body),
    ]);
    // Repo call
    const book = await update({
      bookId: paramsValidate.bookId,
      toUpdate: bodyValidate,
    });

    // Checking repo answer and returning
    if (book.isErr) {
      const error = book.error;
      if (error instanceof DeletedRecordError) {
        return loadFailedResponse(res, 'The book has been already deleted.');
      }
      if (error instanceof ConflictingRecordError) {
        return loadFailedResponse(res, error.message);
      }
      return loadFailedResponse(res, 'The entity does not exist.');
    }
    return res.status(200).send({
      data: book.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};

export default updateBook;
