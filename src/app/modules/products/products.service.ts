import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import { ProductsSearchableFields } from './products.constants'
import { TProducts } from './products.interface'
import { Products } from './products.model'
import AppError from '../../errors/AppError'
import { MainCategories } from '../categories-main/categories.main.model'

const createProductsIntoDb = async (payload: TProducts) => {
  const isMainCategoryExists = await MainCategories.findById(
    payload?.mainCategory
  )

  if (!isMainCategoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Main Category Not Found')
  }

  const existingCategory = await Products.isProductExists(payload.name)

  if (existingCategory) {
    throw new Error('Sub Category already exists')
  }

  const result = (await Products.create(payload)).populate('mainCategory')

  return result
}

const getAllProductsFromDb = async (query: Record<string, unknown>) => {
  const subCategoriesQuery = new QueryBuilder(
    Products.find().populate('mainCategory'),
    query
  )
    .search(ProductsSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await subCategoriesQuery.countTotal()
  const result = await subCategoriesQuery.modelQuery

  return {
    meta,
    result,
  }
}

const getSingleProductFromDb = async (id: string) => {
  const result = await Products.findById(id)

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Requested Sub Category Not Found')
  }

  return result.populate('mainCategory')
}

const updateProductsIntoDb = async (
  id: string,
  payload: Partial<TProducts>
) => {
  const isMainCategoryExists = await MainCategories.findById(
    payload?.mainCategory
  )

  if (!isMainCategoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Main Category Not Found')
  }

  const existingCategory = await Products.isProductExists(
    payload?.name as string
  )

  if (existingCategory) {
    throw new Error('Sub Category already exists')
  }

  const isSubCategoryExists = await Products.findById(id)

  if (!isSubCategoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Requested Sub Category Not Found')
  }

  const { image, ...remainingSubCategoryData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingSubCategoryData,
  }

  if (image && Object.keys(image).length) {
    for (const [key, value] of Object.entries(image)) {
      modifiedUpdatedData[`image.${key}`] = value
    }
  }

  const result = await Products.findByIdAndUpdate(
    id,
    modifiedUpdatedData,

    {
      new: true,
      runValidators: true,
    }
  )

  return result?.populate('mainCategory')
}

const deleteProductsFromDb = async (id: string) => {
  const isSubCategoryExists = await Products.findById(id)

  if (!isSubCategoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Requested Sub Category Not Found')
  }

  const result = await Products.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  )

  return result
}

export const ProductsServices = {
  createProductsIntoDb,
  getAllProductsFromDb,
  getSingleProductFromDb,
  updateProductsIntoDb,
  deleteProductsFromDb,
}
