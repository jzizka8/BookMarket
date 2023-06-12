import type { Request, Response } from 'express';
import { signInSchema } from '../../schemas/userSchemas';
import createUser from '../../repositories/user/create';
import { failResponse, loadFailedResponse } from '../common';
import { ConflictingRecordError } from '../../repositories/types/errors';

const create = async (req: Request, res: Response) => {
  try {
    // Validation
    const bodyValidate = signInSchema.parse(req.body);

    // Repo call
    const userCreated = await createUser(bodyValidate);

    // Checking repo answer and returning
    if (userCreated.isErr) {
      if (userCreated.error instanceof ConflictingRecordError) {
        return loadFailedResponse(res, 'The user with this name already exist.')
      }
      return loadFailedResponse(res, 'The entity can not be created.');
    }
    return res.status(201).send({
      data: userCreated.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};

export default create;
