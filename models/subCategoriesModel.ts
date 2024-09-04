import { model, Schema } from 'mongoose';
import { SubCategoriesInterface } from '../interfaces/subCategoriesInterface';

const SubCategorySchema: Schema = new Schema<SubCategoriesInterface>(
    {
        name: { type: String, required: true, trim: true },
        category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    },
    { timestamps: true }
);

SubCategorySchema.pre<SubCategoriesInterface>(/^find/, function (next) {
    this.populate({
        path: 'category',
        select: 'name _id',
    });
    next();
});

export default model<SubCategoriesInterface>('SubCategory', SubCategorySchema);