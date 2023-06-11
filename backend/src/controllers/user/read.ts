import type { Request, Response } from 'express';
import { signInSchema, specificSchema } from '../../schemas/userSchemas';
import { specific, login } from '../../repositories/user/read';
import { failResponse, loadFailedResponse } from '../common';

export const specificUser = async (req: Request, res: Response) => {
  try {
    // Validation
    const queryValidate = await specificSchema.parse(req.params);
    
    // Repo call
    const user = await specific(queryValidate);
    
    // Checking repo answer and returning
    if (user.isErr) {
      return loadFailedResponse(res);
    }
    return res.status(201).send({
      data: user.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
}

export const userLogin = async (req: Request, res: Response) => {
  try {
    // Validation
    const queryValidate = signInSchema.parse(req.body);

    // Repo call
    const user = await login(queryValidate);

    // Checking repo answer and returning
    if (user.isErr) {
      return loadFailedResponse(res);
    }
    return res.status(201).send({
      data: user.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};
