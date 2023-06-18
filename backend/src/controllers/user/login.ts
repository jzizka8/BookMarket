import type { Request, Response } from 'express';
import { userLoginScheme } from '../../schemas/userSchemas';
import { login } from '../../repositories/user/read';
import { WrongOwnershipError } from '../../repositories/types/errors';
import { failResponse, loadFailedResponse } from '../common';

export const userLogin = async (req: Request, res: Response) => {
  try {
    const bodyValidate = userLoginScheme.parse(req.body);

    const user = await login(bodyValidate);

    if (user.isErr) {
      const error = user.unwrap();
      if (error instanceof WrongOwnershipError) {
        return loadFailedResponse(res, error.message);
      }
      return loadFailedResponse(res, 'The user does not exist.');
    }

    req.session.user = { username: user.value.username };

    return res.status(200).send({
      data: user.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};

export default userLogin;
