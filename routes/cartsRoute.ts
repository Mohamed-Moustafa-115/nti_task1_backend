import { Router } from "express";
import { allowedTo, checkActive, protectRoutes } from "../controllers/authenticationController";
import { addProductToCart, applyCoupon, clearCart, getLoggedUserCart, removeProduct, updateProductQuantity } from "../controllers/cartsController";
import { addProductToCartValidator, removeProductFromCartValidator, updateProductQuantityValidator } from "../utils/validation/cartsValidator";

const cartsRoute: Router = Router();
cartsRoute.use(protectRoutes, checkActive, allowedTo('user'))

cartsRoute.route('/')
  .get(getLoggedUserCart)
  .post(addProductToCartValidator, addProductToCart)
  .delete(clearCart);

cartsRoute.put('/applyCoupon', applyCoupon)

cartsRoute.route('/:itemId')
  .put(updateProductQuantityValidator, updateProductQuantity)
  .delete(removeProductFromCartValidator, removeProduct);

export default cartsRoute;