import { Model, Schema } from 'mongoose'

export interface TNestedSubCategory {
  name: string
  image: string[]
  mainCategory: Schema.Types.ObjectId
  subCategory: Schema.Types.ObjectId
  isDeleted: boolean
}

export interface NestedSubCategoriesModel extends Model<TNestedSubCategory> {
  //instance methods for checking if the category exist
  isNestedSubCategoryExists(name: string): Promise<TNestedSubCategory>
}
