import { Router } from 'express';
import CategoryController from '../controllers/category';

const categoryRouter = Router();
export const categoryRouteGeneric = '/category';
export const categoryRouteSpecific = `${categoryRouteGeneric}/:id`;

// POST /category
categoryRouter.post(categoryRouteGeneric, CategoryController.create);

// GET /category/{id}
categoryRouter.get(categoryRouteSpecific, CategoryController.specificCategory);

// GET /category
categoryRouter.get(categoryRouteGeneric, CategoryController.allCategories);
