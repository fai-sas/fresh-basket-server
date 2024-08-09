import { Model } from 'mongoose'

export interface TMainCategory {
  name: string
  image: string[]
  isDeleted: boolean
}

export interface MainCategoriesModel extends Model<TMainCategory> {
  //instance methods for checking if the category exist
  isMainCategoryExists(name: string): Promise<TMainCategory>
}
