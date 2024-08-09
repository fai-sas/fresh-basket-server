import { Schema, model } from 'mongoose'
import { SubCategoriesModel, TSubCategory } from './categories.sub.interface'

const subCategoriesSchema = new Schema<TSubCategory, SubCategoriesModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    image: {
      type: [String],
      required: [true, 'Please provide category image'],
    },
    mainCategory: {
      type: Schema.Types.ObjectId,
      ref: 'MainCategories',
      required: [true, 'Main category is required'],
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
subCategoriesSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

subCategoriesSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

subCategoriesSchema.statics.isSubCategoryExists = async function (
  name: string
) {
  return await SubCategories.findOne({ name })
}

export const SubCategories = model<TSubCategory, SubCategoriesModel>(
  'SubCategories',
  subCategoriesSchema
)
