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
      return loadFailedResponse(res);
    }
    return res.status(201).send({
      data: invoices.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};

// Since we're not using any parameters for this call, I'll just leave out the req
export const specificInvoice = async (req: Request, res: Response) => {
  try {
    // Validation
    const bodyValidate = specificSchema.parse(req.params);

    // Repo call
    const invoice = await specific(bodyValidate);

    // Checking repo answer and returning
    if (invoice.isErr) {
      return loadFailedResponse(res);
    }
    return res.status(201).send({
      data: invoice.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
};
