import { Router } from 'express';
import BookController from '../controllers/book';

const bookRouter = Router();
export const bookRouteSpecific = '/book/:bookId';

bookRouter.post('/book', BookController.create);

// DELETE /book/{bookId}
bookRouter.delete(bookRouteSpecific, BookController.deleteBook);

// GET /book/{bookId}
bookRouter.get(bookRouteSpecific, BookController.specificBook);

// POST
bookRouter.post('/book/load', BookController.allBooks);

// PATCH book/{bookId}
bookRouter.patch(bookRouteSpecific, BookController.update);

export default bookRouter;
