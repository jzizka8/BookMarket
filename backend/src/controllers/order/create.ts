import type { Request, Response } from 'express';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  createBodySchema,
  createParamsSchema,
} from '../../schemas/orderSchemas';
import createOrder from '../../repositories/order/create';
import { failResponse, loadFailedResponse } from '../common';
import {
  DeletedRecordError,
  NonexistentRecordError,
} from '../../repositories/types/errors';

const create = async (req: Request, res: Response) => {
  try {
    // Validation
    const [paramsValidate, bodyValidate] = await Promise.all([
      createParamsSchema.parseAsync(req.params),
      createBodySchema.parseAsync(req.body),
    ]);

    const data = {
      userId: paramsValidate.userId,
      ...bodyValidate,
    };

    // Repo call
    const order = await createOrder(data);

    // Checking repo answer and returning
    if (order.isErr) {
      const { error } = order;
      if (error instanceof PrismaClientKnownRequestError) {
        return loadFailedResponse(res, 'The user does not exist.');
      }
      if (
        error instanceof DeletedRecordError ||
        error instanceof NonexistentRecordError
      ) {
        return loadFailedResponse(res, error.message);
      }
      return loadFailedResponse(res, 'The entity can not be created.');
    }
    return res.status(201).send({
      data: order.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};

export default create;
