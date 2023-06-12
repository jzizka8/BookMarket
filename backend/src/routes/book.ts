import { Router } from 'express';
import BookController from '../controllers/book';

const bookRouter = Router();
export const bookRouteGeneric = '/user/:userId/book';
export const bookRouteSpecific = `${bookRouteGeneric}/:bookId`;

// POST /user/{userId}/book
bookRouter.post(bookRouteGeneric, BookController.create);

// DELETE /user/{userId}/book/{bookId}
bookRouter.delete(bookRouteSpecific, BookController.deleteBook);

// GET /user/{userId}/book/{bookId}
bookRouter.get(bookRouteGeneric, BookController.specificBook);

// GET /user/{userId}/book
bookRouter.get(bookRouteGeneric, BookController.allBooks);

// PATCH /user/{userId}/book/{bookId}
bookRouter.patch(bookRouteSpecific, BookController.update);

export default bookRouter;