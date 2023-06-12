import type { Request, Response } from 'express';
import { categorySpecificSchema } from '../../schemas/categorySchemas';
import { all, specific } from '../../repositories/category/read';
import { loadFailedResponse, failResponse } from '../common';

export const specificCategory = async (req: Request, res: Response) => {
  try {
    // Validation
    const paramsValidate = categorySpecificSchema.parse(req.params);

    // Repo call
    const category = await specific(paramsValidate);

    // Checking repo answer and returning
    if (category.isErr) {
      return loadFailedResponse(res, 'The entity does not exist.');
    }
    return res.status(200).send({
      data: category.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};

// Since we're not using any parameters for this call, I'll just leave out the req
export const allCategories = async (_: Request, res: Response) => {
  try {
    const category = await all();
    // Checking repo answer and returning
    if (category.isErr) {
      return loadFailedResponse(res, 'The entity does not exist.');
    }
    return res.status(200).send({
      data: category.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};
