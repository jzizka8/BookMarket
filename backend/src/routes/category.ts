import { Router } from 'express';
import CategoryController from '../controllers/category';

const categoryRouter = Router();
export const categoryRouteGeneric = '/category';

// POST /category
categoryRouter.post(categoryRouteGeneric, CategoryController.create);

// GET /category/{name}
categoryRouter.get('/category/:name', CategoryController.specificCategory);

// GET /category
categoryRouter.get(categoryRouteGeneric, CategoryController.allCategories);

export default categoryRouter;
