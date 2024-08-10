import { Model, Schema } from 'mongoose'

export interface TProducts {
  name: string
  mainCategory: Schema.Types.ObjectId
  subCategory: Schema.Types.ObjectId
  nestedSubCategory?: Schema.Types.ObjectId
  image: string[]
  description: string
  price: number
  unit: string
  quantity: string
  stock: number
  sku: string
  availability: 'in stock' | 'out of stock'
  ratings: number
  isDeleted: boolean
}

export interface ProductsModel extends Model<TProducts> {
  //instance methods for checking if the category exist
  isProductExists(name: string): Promise<TProducts>
}
