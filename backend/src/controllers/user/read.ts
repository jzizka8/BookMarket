import type { Request, Response } from 'express';
import { signInSchema, specificSchema } from '../../schemas/userSchemas';
import { specific, login } from '../../repositories/user/read';
import { failResponse, loadFailedResponse } from '../common';
import { WrongOwnershipError } from '../../repositories/types/errors';

export const specificUser = async (req: Request, res: Response) => {
  try {
    // Validation
    const paramsValidate = specificSchema.parse(req.params);

    // Repo call
    const user = await specific(paramsValidate);

    // Checking repo answer and returning
    if (user.isErr) {
      return loadFailedResponse(res, 'The user does not exist.');
    }
    return res.status(200).send({
      data: user.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    // Validation
    const bodyValidate = signInSchema.parse(req.body);

    // Repo call
    const user = await login(bodyValidate);

    // Checking repo answer and returning
    if (user.isErr) {
      const error = user.unwrap();
      if (error instanceof WrongOwnershipError) {
        return loadFailedResponse(res, error.message);
      }
      return loadFailedResponse(res, 'The user does not exist.');
    }
    return res.status(200).send({
      data: user.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};
