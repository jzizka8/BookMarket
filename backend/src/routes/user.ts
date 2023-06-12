import { Router } from 'express';
import UserController from '../controllers/user';

const userRouter = Router();
export const userRouteGeneric = '/user';
export const userRouteSpecific = `${userRouteGeneric}/:id`;

// POST /user
userRouter.post(userRouteGeneric, UserController.create);

// GET /user
userRouter.get(userRouteGeneric, UserController.userLogin);

// GET /user/{id}
userRouter.get(userRouteSpecific, UserController.specificUser);

export default userRouter;
