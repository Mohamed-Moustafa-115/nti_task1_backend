import { Schema, model } from "mongoose";
import { SubCategoriesInterface } from "../interfaces/subCategoriesInterface";

const subCategoriesSchema: Schema = new Schema<SubCategoriesInterface>({
  name: { type: String, required: true, trim: true },
  image: String,
  category: { type: Schema.Types.ObjectId, required: true, ref: 'categories' }
}, { timestamps: true });

subCategoriesSchema.pre<SubCategoriesInterface>(/^find/, function (next) {
  this.populate({ path: 'category', select: 'name' })
  next()
})

export default model<SubCategoriesInterface>('subCategories', subCategoriesSchema)