import { NextFunction, Request, Response } from "express";
import reviewsModel from "../models/reviewsModel";
import { ReviewsInterface} from "../interfaces/reviewsInterface";
import { filterDataInterface } from "../interfaces/filterDataInterface";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./refactorHandler";

export const filterReviews = (req: Request, res: Response, next: NextFunction) => {
  let filterData: filterDataInterface = {};
  if (req.params.productId) { filterData.product = req.params.productId };
  if (req.user?.role === 'user' && !req.params.productId) { filterData.user = req.user._id };
  req.filterData = filterData;
  next();
}
export const setProductAndUserId = (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.product) { req.body.product = req.params.productId };
  if (!req.body.user) { req.body.user = req.user?._id };
  next();
};

export const createReview = createOne<ReviewsInterface>(reviewsModel)
export const getReviews = getAll<ReviewsInterface>(reviewsModel, 'reviews')
export const getReview = getOne<ReviewsInterface>(reviewsModel)
export const updateReview = updateOne<ReviewsInterface>(reviewsModel)
export const deleteReview = deleteOne<ReviewsInterface>(reviewsModel)