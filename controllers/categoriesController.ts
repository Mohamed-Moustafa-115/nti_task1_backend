import asyncHandler from "express-async-handler";
import sharp from "sharp";
import categoriesModel from "../models/categoriesModel";
import { CategoriesInterface } from "../interfaces/categoriesInterface";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./refactorHandler";
import { uploadSingleImage } from "../middleware/uploadImagesMiddleware";

export const createCategory = createOne<CategoriesInterface>(categoriesModel)
export const getCategories = getAll<CategoriesInterface>(categoriesModel, 'categories')
export const getCategory = getOne<CategoriesInterface>(categoriesModel)
export const updateCategory = updateOne<CategoriesInterface>(categoriesModel)
export const deleteCategory = deleteOne<CategoriesInterface>(categoriesModel)
export const uploadCategoryImage = uploadSingleImage('image');
export const resizeCategoryImage = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const imageName: string = `category-${Date.now()}.jpeg`
    await sharp(req.file.buffer)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/categories/${imageName}`)
    req.body.image = imageName;
  }
  next();
});