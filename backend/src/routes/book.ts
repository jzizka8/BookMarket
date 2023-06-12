import { Router } from 'express';
import BookController from '../controllers/book';

const bookRouter = Router();
export const bookRouteGeneric = '/book';
export const bookRouteSpecific = `${bookRouteGeneric}/:id`;
export const bookRouteCreate = '/user/:soldBy/book'

// POST /user/:soldBy/book
bookRouter.post(bookRouteCreate, BookController.create);

// DELETE /book/{bookId}
bookRouter.delete(bookRouteSpecific, BookController.deleteBook);

// GET /book/{bookId}
bookRouter.get(bookRouteSpecific, BookController.specificBook);

// GET /book
bookRouter.get(bookRouteGeneric, BookController.allBooks);

// PATCH book/{bookId}
bookRouter.patch(bookRouteSpecific, BookController.update);

export default bookRouter;
