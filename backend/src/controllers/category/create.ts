import type { Request, Response } from 'express';
import { categoryCreateSchema } from '../../schemas/categorySchemas';
import createCategory from '../../repositories/category/create';
import { failResponse, loadFailedResponse } from '../common';

const create = async (req: Request, res: Response) => {
  try {
    // Validation
    const bodyValidate = categoryCreateSchema.parse(req.body);

    // Repo call
    const category = await createCategory(bodyValidate);

    // Checking repo answer and returning
    if (category.isErr) {
      return loadFailedResponse(res);
    }
    return res.status(201).send({
      data: category.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};

export default create;
