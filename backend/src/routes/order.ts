import { Router } from 'express';
import OrderController from '../controllers/order';
import auth from '../middleware/authMiddleware';

const orderRouter = Router();

// POST /user/{userId}/order
orderRouter.post('/user/:userId/order', auth(), OrderController.create);

// GET /order/{orderId}
orderRouter.get('/order/:orderId', OrderController.specificOrder);

export default orderRouter;
