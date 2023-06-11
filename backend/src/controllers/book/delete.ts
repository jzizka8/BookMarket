import type { Request, Response } from "express";
import delBook from "../../repositories/book/delete";
import { bookDeleteSchema } from "../../schemas/bookSchemas"
import { loadFailedResponse, failResponse } from "../common";

const deleteBook = async (req: Request, res: Response) => {
  try {
  // Validation
  const paramsValidate = bookDeleteSchema.parse(req.body);

  // Repo call
  const book = await delBook(paramsValidate);

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

export default deleteBook;