import { Router } from 'express';
import auth from '../middleware/authMiddleware';
import register from '../controllers/user/register';
import logout from '../controllers/user/logout';
import specificUser from '../controllers/user/read';
import { userLogin } from '../controllers/user/login';

const authRouter = Router();

/**
 * This endpoint provides information about the currenct authentication.
 * If the user is authorized it returns the user entity. If there is
 * invalid cookie or missing cookie, it returns 401.
 */
authRouter.get('/user', auth(), specificUser);

authRouter.post('/registration', register);

authRouter.post('/login', userLogin);

authRouter.post('/logout', logout);

export default authRouter;
