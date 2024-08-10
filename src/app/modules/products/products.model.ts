import { Schema, model } from 'mongoose'
import { ProductsModel, TProducts } from './products.interface'

const productsSchema = new Schema<TProducts, ProductsModel>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
    },
    mainCategory: {
      type: Schema.Types.ObjectId,
      ref: 'MainCategories',
      required: [true, 'Main category is required'],
    },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: 'SubCategories',
      required: [true, 'Subcategory is required'],
    },
    nestedSubCategory: {
      type: Schema.Types.ObjectId,
      ref: 'NestedSubCategories',
    },
    image: {
      type: [String],
      required: [true, 'At least one image is required'],
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    price: {
      type: Number,
      required: [true, 'Product price is required'],
    },
    unit: {
      type: String,
      required: [true, 'Unit of measurement is required'],
    },
    quantity: {
      type: String,
      required: [true, 'Quantity is required'],
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
    },
    sku: {
      type: String,
      required: [true, 'SKU is required'],
    },
    availability: {
      type: String,
      enum: ['in stock', 'out of stock'],
      required: [true, 'Availability status is required'],
    },
    ratings: {
      type: Number,
      required: [true, 'Product rating is required'],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

// filter out deleted documents
productsSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

productsSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

productsSchema.statics.isProductExists = async function (name: string) {
  return await Products.findOne({ name })
}

export const Products = model<TProducts, ProductsModel>(
  'Products',
  productsSchema
)
