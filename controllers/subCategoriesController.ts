import asyncHandler from 'express-async-handler';
import sharp from "sharp";
import subCategoriesModel from "../models/subCategoriesModel";
import { SubCategoriesInterface } from "../interfaces/subCategoriesInterface";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./refactorHandler";
import { NextFunction, Request, Response } from "express";
import { FilterDataInterface } from "../interfaces/filterDataInterface";
import { uploadSingleImage } from "../middleware/uploadImagesMiddleware";

export const filterData = (req: Request, res: Response, next: NextFunction) => {
  let filterData: FilterDataInterface = {};
  if (req.params.categoryId) { filterData.category = req.params.categoryId };
  req.filterData = filterData;
  next();
}

export const setCategoryId = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.category) { req.body.category = req.params.categoryId };
  next();
};

export const createSubcategory = createOne<SubCategoriesInterface>(subCategoriesModel)
export const getSubcategories = getAll<SubCategoriesInterface>(subCategoriesModel, 'subcategories')
export const getSubcategory = getOne<SubCategoriesInterface>(subCategoriesModel)
export const updateSubcategory = updateOne<SubCategoriesInterface>(subCategoriesModel)
export const deleteSubcategory = deleteOne<SubCategoriesInterface>(subCategoriesModel)
export const uploadSubcategoryImage = uploadSingleImage('image');
export const resizeSubcategoryImage = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const imageName: string = `subcategory-${Date.now()}.jpeg`
    await sharp(req.file.buffer)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/subcategories/${imageName}`)
    req.body.image = imageName;
  }
  next();
});