import type { Request, Response } from "express";
import { createBodySchema, createParamsSchema } from "../../schemas/invoiceSchemas";
import createInvoice from "../../repositories/invoice/create";
import { failResponse, loadFailedResponse } from "../common";

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
    const book = await createInvoice(data);

    // Checking repo answer and returning
    if (book.isErr) {
      return loadFailedResponse(res);
    }
    return res.status(201).send({
      data: book.unwrap(),
    });
  } catch (e) {
    return failResponse(res, e);
  }
}

export default create