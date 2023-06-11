import type { Request, Response } from 'express';
import { loadFailedResponse, failResponse } from '../common';
import { updateBodySchema, updateParamsSchema } from '../../schemas/bookSchemas';
import update from '../../repositories/book/update';

const updateBook = async (req: Request, res: Response) => {
  try {
    // Validation
    const [paramsValidate, bodyValidate] = await Promise.all([
      updateParamsSchema.parseAsync(req.params),
      updateBodySchema.parseAsync(req.body)
    ]);
    // Repo call
    const book = await update({ 
      id: paramsValidate.id, 
      toUpdate: bodyValidate 
    });

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

export default updateBook;
