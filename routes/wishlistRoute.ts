import { Router } from "express";
import { allowedTo, checkActive, protectRoutes } from "../controllers/authenticationController";
import { addProductToWishlist, getLoggedUserWishlist, removeProductFromWishlist } from "../controllers/wishlistController";

const wishlistRoute: Router = Router();

wishlistRoute.use(protectRoutes, checkActive, allowedTo('user'))

wishlistRoute.route('/')
  .get(getLoggedUserWishlist)
  .post(addProductToWishlist)
wishlistRoute.route('/:product')
  .delete(removeProductFromWishlist)

export default wishlistRoute;