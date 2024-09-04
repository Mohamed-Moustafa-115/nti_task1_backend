import { Request, Response, NextFunction } from "express";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./refactorHandler";
import sharp from 'sharp';
import { ProductsInterface } from "../interfaces/productsInterface";
import productsModel from "../models/productsModel";
import asyncHandler from 'express-async-handler';
import { uploadMultiImages } from "../middleware/uploadImagesMiddleware";

export const uploadProductImages = uploadMultiImages([
  { name: 'cover', maxCount: 1 },
  { name: 'images', maxCount: 5 }
]);

export const resizeImages = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (req.files) {
    if (req.files.cover) {
      const coverName: string = `Product-${Date.now()}-cover.png`;
      await sharp(req.files.cover[0].buffer)
        .toFormat('png')
        .png({ quality: 95 })
        .toFile(`uploads/products/${coverName}`);
      req.body.cover = coverName;
    }

    if (req.files.images) {
      req.body.images = [];
      await Promise.all(req.files.images.map(async (img: any, index: number) => {
        const imageName: string = `Product-${Date.now()}N${index + 1}.png`;
        await sharp(img.buffer)
          .toFormat('png')
          .png({ quality: 95 })
          .toFile(`uploads/products/${imageName}`);
        req.body.images.push(imageName);
      }));
    }
  }
  next();
});

export const createProduct = createOne<ProductsInterface>(productsModel);
export const getProducts = getAll<ProductsInterface>(productsModel, 'products');
export const getProduct = getOne<ProductsInterface>(productsModel, 'reviews');
export const updateProduct = updateOne<ProductsInterface>(productsModel);
export const deleteProduct = deleteOne<ProductsInterface>(productsModel);
