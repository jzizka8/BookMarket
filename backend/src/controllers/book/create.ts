import type { Request, Response } from "express";
import { loadFailedResponse, failResponse } from "../common";
import createBook from "../../repositories/book/create";
import { bookCreateBodySchema, bookCreateParamsSchema } from "../../schemas/bookSchemas";

const create = async (req: Request, res: Response) => {
  try {
    // Validation
    const [paramsValidate, bodyValidate] = await Promise.all([
      bookCreateParamsSchema.parseAsync(req.params),
      bookCreateBodySchema.parseAsync(req.body),
    ]);

    const data = {
      soldBy: paramsValidate.soldBy,
      ...bodyValidate,
    };
    // Repo call
    const book = await createBook(data);

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