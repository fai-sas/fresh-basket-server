import { Schema, model } from 'mongoose'
import { MainCategoriesModel, TMainCategory } from './categories.main.interface'

const mainCategoriesSchema = new Schema<TMainCategory, MainCategoriesModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    image: {
      type: [String],
      required: [true, 'Please provide category image'],
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
mainCategoriesSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

mainCategoriesSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

mainCategoriesSchema.statics.isMainCategoryExists = async function (
  name: string
) {
  return await MainCategories.findOne({ name })
}

export const MainCategories = model<TMainCategory, MainCategoriesModel>(
  'MainCategories',
  mainCategoriesSchema
)
