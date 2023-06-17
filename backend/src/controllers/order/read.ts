import type { Request, Response } from 'express';
import { specificSchema } from '../../schemas/orderSchemas';
import { specific } from '../../repositories/order/read';
import { failResponse, loadFailedResponse } from '../common';

export const specificOrder = async (req: Request, res: Response) => {
  try {
    // Validation
    const paramsValidate = specificSchema.parse(req.params);

    // Repo call
    const order = await specific(paramsValidate);

    // Checking repo answer and returning
    if (order.isErr) {
      return loadFailedResponse(res, 'The order does not exist.');
    }
    return res.status(200).send({
      data: order.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};
