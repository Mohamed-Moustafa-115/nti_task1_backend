import { CouponsInterface } from "../interfaces/couponsInterface";
import couponsModel from "../models/couponsModel";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./refactorHandler";

export const createCoupon = createOne<CouponsInterface>(couponsModel)
export const getCoupons = getAll<CouponsInterface>(couponsModel, 'coupons')
export const getCoupon = getOne<CouponsInterface>(couponsModel)
export const updateCoupon = updateOne<CouponsInterface>(couponsModel)
export const deleteCoupon = deleteOne<CouponsInterface>(couponsModel)