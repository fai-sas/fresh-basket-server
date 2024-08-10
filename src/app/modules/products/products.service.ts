import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import { ProductsSearchableFields } from './products.constants'
import { TProducts } from './products.interface'
import { Products } from './products.model'
import AppError from '../../errors/AppError'
import { MainCategories } from '../categories-main/categories.main.model'
import { SubCategories } from '../categories-sub/categories.sub.model'
import { NestedSubCategories } from '../categories-nested-sub/categories.nested.sub.model'

const createProductsIntoDb = async (payload: TProducts) => {
  const isMainCategoryExists = await MainCategories.findById(
    payload?.mainCategory
  )

  if (!isMainCategoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Main Category Not Found')
  }

  const isSubCategoryExists = await SubCategories.findById(payload?.subCategory)

  if (!isSubCategoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Sub Category Not Found')
  }

  if (payload.nestedSubCategory) {
    const isNestedSubCategoryExists = await NestedSubCategories.findById(
      payload.nestedSubCategory
    )
    if (!isNestedSubCategoryExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Requested Nested Sub Category Not Found'
      )
    }
  }

  const existingProduct = await Products.isProductExists(payload.name)

  if (existingProduct) {
    throw new Error('Product already exists')
  }

  const result = (await Products.create(payload)).populate('mainCategory')

  return result
}

const getAllProductsFromDb = async (query: Record<string, unknown>) => {
  const productsQuery = new QueryBuilder(
    Products.find().populate('mainCategory'),
    query
  )
    .search(ProductsSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await productsQuery.countTotal()
  const result = await productsQuery.modelQuery

  return {
    meta,
    result,
  }
}

const getSingleProductFromDb = async (id: string) => {
  const result = await Products.findById(id)

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Requested Product Not Found')
  }

  return result.populate('mainCategory')
}

const updateProductsIntoDb = async (
  id: string,
  payload: Partial<TProducts>
) => {
  if (payload.mainCategory) {
    const isMainCategoryExists = await MainCategories.findById(
      payload.mainCategory
    )
    if (!isMainCategoryExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'Main Category Not Found')
    }
  }

  if (payload.subCategory) {
    const isSubCategoryExists = await SubCategories.findById(
      payload.subCategory
    )
    if (!isSubCategoryExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Requested Sub Category Not Found'
      )
    }
  }

  if (payload.nestedSubCategory) {
    const isNestedSubCategoryExists = await NestedSubCategories.findById(
      payload.nestedSubCategory
    )
    if (!isNestedSubCategoryExists) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'Requested Nested Sub Category Not Found'
      )
    }
  }

  const existingProduct = await Products.isProductExists(
    payload?.name as string
  )

  if (existingProduct) {
    throw new Error('Product already exists')
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

  const result = await Products.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })

  return result?.populate('mainCategory')
}

const deleteProductsFromDb = async (id: string) => {
  const isProductExists = await Products.findById(id)

  if (!isProductExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product Not Found')
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
