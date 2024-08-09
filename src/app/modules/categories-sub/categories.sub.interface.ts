import { Model, Schema } from 'mongoose'

export interface TSubCategory {
  name: string
  image: string[]
  mainCategory: Schema.Types.ObjectId
  isDeleted: boolean
}

export interface SubCategoriesModel extends Model<TSubCategory> {
  //instance methods for checking if the category exist
  isSubCategoryExists(name: string): Promise<TSubCategory>
}
