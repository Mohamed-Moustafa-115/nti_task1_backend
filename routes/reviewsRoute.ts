import { Router } from "express";
import { allowedTo, checkActive, protectRoutes } from "../controllers/authenticationController";
import { createReview, deleteReview, filterReviews, getReview, getReviews, setProductAndUserId, updateReview } from "../controllers/reviewsController";
import { createReviewValidator, deleteReviewValidator, getReviewValidator, updateReviewValidator } from "../utils/validation/reviewsValidator";
const reviewsRoute: Router = Router({ mergeParams: true });

reviewsRoute.route('/')
  .get(filterReviews, getReviews)
  .post(protectRoutes, checkActive, allowedTo('user'), setProductAndUserId, createReviewValidator, createReview);

reviewsRoute.route('/myReviews').get(protectRoutes, checkActive, allowedTo('user'), filterReviews, getReviews);

reviewsRoute.route('/:id')
  .get(getReviewValidator, getReview)
  .put(protectRoutes, checkActive, allowedTo('user'), updateReviewValidator, updateReview)
  .delete(protectRoutes, checkActive, allowedTo('manager', 'admin', 'user'), deleteReviewValidator, deleteReview);

export default reviewsRoute;