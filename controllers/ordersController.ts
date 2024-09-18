import ordersModel from "../models/ordersModel";
import { ordersInterface } from "../interfaces/ordersInterface";
import { getAll, getOne } from "./refactorHandler";
import { NextFunction, Request, Response } from 'express';
import { filterDataInterface } from "../interfaces/filterDataInterface";
import asyncHandler from 'express-async-handler';
import cartsModel from "../models/cartsModel";
import ApiErrors from "../utils/apiErrors";
import { CartProducts } from "../interfaces/cartsInterface";
import productsModel from "../models/productsModel";

export const filterOrders = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role === 'user') {
    const filterData: filterDataInterface = { user: req.user._id };
    req.filterData = filterData;
  }
  next();
};

export const getOrders = getAll<ordersInterface>(ordersModel, 'orders')

export const getOrder = getOne<ordersInterface>(ordersModel)


export const createOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const taxPrice: number = 100;
  const cart = await cartsModel.findOne({ user: req.user?._id });
  if (!cart) { return next(new ApiErrors('cart not found', 404)) };
  const cartPrice: number = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice;
  const totalOrderPrice: number = cartPrice + taxPrice;
  const order: ordersInterface = await ordersModel.create({
    user: req.user?._id,
    totalPrice: totalOrderPrice,
    address: req.body.address || 'Menofia, Egypt',
    cartItems: cart.cartItems,
    taxPrice
  })
  if (order) {
    const bulkOption = cart.cartItems.map((item: CartProducts) => ({
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.quantity, sold: +item.quantity } }
      }
    }))
    await productsModel.bulkWrite(bulkOption);
    await cartsModel.findByIdAndDelete(cart._id);
  }
  res.status(201).json({ data: order })
});

export const isOrderPaid = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const order = await ordersModel.findByIdAndUpdate(req.params.id, {
    isPaid: true,
    paidAt: Date.now()
  }, { new: true })
  if (!order) { return next(new ApiErrors('order not found', 404)) };
  res.status(200).json({ data: order })
});

export const isOrderDelivered = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const order = await ordersModel.findByIdAndUpdate(req.params.id, {
    isDelivered: true,
    deliveredAt: Date.now()
  }, { new: true })
  if (!order) { return next(new ApiErrors('order not found', 404)) };
  res.status(200).json({ data: order })
});