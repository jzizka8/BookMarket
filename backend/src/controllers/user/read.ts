/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { Request, Response } from 'express';
import { specific } from '../../repositories/user/read';
import { failResponse, loadFailedResponse } from '../common';

const specificUser = async (req: Request, res: Response) => {
  try {
    // Getting username from current cookie session
    const { username } = req.session.user!;

    const user = await specific({ username });

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

export default specificUser;
