import { Schema, model } from 'mongoose'
import {
  NestedSubCategoriesModel,
  TNestedSubCategory,
} from './categories.nested.sub.interface'

const nestedSubCategoriesSchema = new Schema<
  TNestedSubCategory,
  NestedSubCategoriesModel
>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    image: {
      type: [String],
      required: [true, 'Please provide category image'],
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: 'SubCategories',
      required: [true, 'Sub category is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

// filter out deleted documents
nestedSubCategoriesSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

nestedSubCategoriesSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

nestedSubCategoriesSchema.statics.isNestedSubCategoryExists = async function (
  name: string
) {
  return await NestedSubCategories.findOne({ name })
}

export const NestedSubCategories = model<
  TNestedSubCategory,
  NestedSubCategoriesModel
>('NestedSubCategories', nestedSubCategoriesSchema)
