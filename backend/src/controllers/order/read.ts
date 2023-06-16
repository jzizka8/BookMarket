import type { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { allSchema, specificSchema } from '../../schemas/orderSchemas';
import { allByUser, specific } from '../../repositories/order/read';
import { failResponse, loadFailedResponse } from '../common';

export const all = async (req: Request, res: Response) => {
  try {
    // Validation
    const paramsValidate = allSchema.parse(req.params);

    // Repo call
    const orders = await allByUser(paramsValidate);

    // Checking repo answer and returning
    if (orders.isErr) {
      if (orders.error instanceof PrismaClientKnownRequestError) {
        return loadFailedResponse(res, 'The user does not exist.');
      }
      return loadFailedResponse(res, 'The orders does not exist.');
    }
    return res.status(200).send({
      data: orders.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};

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
