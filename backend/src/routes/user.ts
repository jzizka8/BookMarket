import { Router } from 'express';
import UserController from '../controllers/user';

const userRouter = Router();

userRouter.post('/user', UserController.create);

// userRouter.post(userRouteGeneric, UserController.userLogin);

userRouter.get('/user/:userId', UserController.specificUser);

export default userRouter;
