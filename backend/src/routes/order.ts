import { Router } from 'express';
import OrderController from '../controllers/order';

const orderRouter = Router();
export const orderRouteGeneric = '/user/:userId/order';

// POST /user/{userId}/order
orderRouter.post(orderRouteGeneric, OrderController.create);

// GET /order/{orderId}
orderRouter.get('/order/:orderId', OrderController.specificOrder);

export default orderRouter;
