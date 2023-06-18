import { Router } from 'express';
import BookController from '../controllers/book';
import auth from '../middleware/authMiddleware';

const bookRouter = Router();
const bookRouteSpecific = '/book/:bookId';

bookRouter.post('/book', auth(), BookController.create);

// DELETE /book/{bookId}
bookRouter.delete(bookRouteSpecific, auth(), BookController.deleteBook);

// GET /book/{bookId}
bookRouter.get(bookRouteSpecific, BookController.specificBook);

bookRouter.post('/book/load', BookController.allBooks);

// PATCH book/{bookId}
bookRouter.patch(bookRouteSpecific, auth(), BookController.update);

export default bookRouter;
