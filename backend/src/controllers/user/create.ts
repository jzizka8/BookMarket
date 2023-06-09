import type { Request, Response } from 'express';
import { signInSchema } from '../../schemas/userSchemas';
import createUser from '../../repositories/user/create';
import { failResponse, loadFailedResponse } from '../common';

const create = async (req: Request, res: Response) => {
  try {
    // Validation
    const queryValidate = signInSchema.parse(req.body);

    // Repo call
    const userCreated = await createUser(queryValidate);

    // Checking repo answer and returning
    if (userCreated.isErr) {
      return loadFailedResponse(res);
    }
    return res.status(201).send({
      data: userCreated.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};

export default create;