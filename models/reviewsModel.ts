import { Schema, model } from "mongoose";
import { ReviewsInterface } from "../interfaces/reviewsInterface";
import productsModel from "./productsModel";

const reviewsSchema: Schema = new Schema<ReviewsInterface>({
  comment: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  user: { type: Schema.Types.ObjectId, ref: 'users', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'products', required: true }
}, { timestamps: true });

reviewsSchema.statics.calcRatingAndQuantity = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    { $group: { _id: 'product', avgRating: { $avg: '$rating' }, ratingQuantity: { $sum: 1 } } }
  ]);
  console.log(productId);
  console.log(result);
  if (result.length > 0) {
    await productsModel.findByIdAndUpdate(productId, {
      ratingAverage: result[0].avgRating,
      ratingCount: result[0].ratingQuantity
    })
  } else {
    await productsModel.findByIdAndUpdate(productId, {
      ratingAverage: 0,
      ratingCount: 0
    })
  }
};

reviewsSchema.post<ReviewsInterface>('save', async function () { await (this.constructor as any).calcRatingAndQuantity(this.product) })
reviewsSchema.post<ReviewsInterface>('findOneAndDelete', async function (doc) {
  const reviewDoc = doc as unknown as ReviewsInterface;
  if (reviewDoc.product) {
    await (reviewDoc.constructor as any).calcRatingAndQuantity(reviewDoc.product);
  }
});

reviewsSchema.pre<ReviewsInterface>(/^find/, function (next) {
  this.populate({ path: 'user', select: 'name image' })
  next()
})

reviewsSchema.pre<ReviewsInterface>('find', function (next) {
  this.populate({ path: 'product', select: 'name cover' })
  next()
})

export default model<ReviewsInterface>('reviews', reviewsSchema)