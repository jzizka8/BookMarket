import type { Request, Response } from 'express';
import { userRegistrationScheme } from '../../schemas/userSchemas';
import createUser from '../../repositories/user/register';
import { failResponse, loadFailedResponse } from '../common';
import { ConflictingRecordError } from '../../repositories/types/errors';

const register = async (req: Request, res: Response) => {
  try {
    const body = userRegistrationScheme.parse(req.body);

    const userCreated = await createUser(body);

    if (userCreated.isErr) {
      if (userCreated.error instanceof ConflictingRecordError) {
        return loadFailedResponse(
          res,
          'The user with this name already exist.'
        );
      }
      return loadFailedResponse(res, 'The user can not be created.');
    }
    return res.status(201).send({
      data: userCreated.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};

export default register;
