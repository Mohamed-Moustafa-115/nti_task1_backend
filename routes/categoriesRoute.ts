import { Router } from "express";
import { createCategory, deleteCategory, getCategories, getCategory, resizeCategoryImage, updateCategory, uploadCategoryImage } from "../controllers/categoriesController";
import { createCategoryValidator, deleteCategoryValidator, getCategoryValidator, updateCategoryValidator } from "../utils/validation/categoriesValidator";
import subcategoriesRoute from "./subcategoriesRoute";
import { allowedTo, checkActive, protectRoutes } from "../controllers/authenticationController";

const categoriesRoute: Router = Router();

categoriesRoute.use('/:categoryId/subcategories', subcategoriesRoute);

categoriesRoute.route('/')
  .get(getCategories)
  .post(protectRoutes, checkActive, allowedTo('manager', 'admin'), uploadCategoryImage, resizeCategoryImage, createCategoryValidator, createCategory);

categoriesRoute.route('/:id')
  .get(getCategoryValidator, getCategory)
  .put(protectRoutes, checkActive, allowedTo('manager', 'admin'), uploadCategoryImage, resizeCategoryImage, updateCategoryValidator, updateCategory)
  .delete(protectRoutes, checkActive, allowedTo('manager', 'admin'), deleteCategoryValidator, deleteCategory);

export default categoriesRoute;