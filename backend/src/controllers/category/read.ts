import type { Request, Response } from 'express';
import { categorySpecificSchema } from '../../schemas/categorySchemas';
import { all, specific } from '../../repositories/category/read';
import { loadFailedResponse, failResponse } from '../common';

export const specificCategory = async (req: Request, res: Response) => {
  try {
    // Validation
    const bodyValidate = categorySpecificSchema.parse(req.body);

    // Repo call
    const category = await specific(bodyValidate);

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

// Since we're not using any parameters for this call, I'll just leave out the req
export const allCategories = async (res: Response) => {
  try {
    const category = await all();
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
