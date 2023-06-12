import type { Request, Response } from 'express';
import { allSchema, specificSchema } from '../../schemas/invoiceSchemas';
import { allByUser, specific } from '../../repositories/invoice/read';
import { failResponse, loadFailedResponse } from '../common';

export const all = async (req: Request, res: Response) => {
  try {
    // Validation
    const paramsValidate = allSchema.parse(req.params);

    // Repo call
    const invoices = await allByUser(paramsValidate);

    // Checking repo answer and returning
    if (invoices.isErr) {
      return loadFailedResponse(res, 'The entity does not exist.');
    }
    return res.status(200).send({
      data: invoices.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};

export const specificInvoice = async (req: Request, res: Response) => {
  try {
    // Validation
    const paramsValidate = specificSchema.parse(req.params);

    // Repo call
    const invoice = await specific(paramsValidate);

    // Checking repo answer and returning
    if (invoice.isErr) {
      return loadFailedResponse(res, 'The entity does not exist.');
    }
    return res.status(200).send({
      data: invoice.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};
