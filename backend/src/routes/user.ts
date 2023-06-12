import { Router } from 'express';
import UserController from '../controllers/user';

const userRouter = Router();
export const userRouteGeneric = '/user';
export const userRouteSpecific = `${userRouteGeneric}/:id`;

// POST /user
userRouter.post(userRouteGeneric, UserController.create);

// POST /user
// userRouter.post(userRouteGeneric, UserController.userLogin);

// GET /user/{id}
userRouter.get(userRouteSpecific, UserController.specificUser);

export default userRouter;
