import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import { NestedSubCategoriesSearchableFields } from './categories.nested.sub.constants'
import { TNestedSubCategory } from './categories.nested.sub.interface'
import { NestedSubCategories } from './categories.nested.sub.model'
import AppError from '../../errors/AppError'
import { MainCategories } from '../categories-main/categories.main.model'
import { SubCategories } from '../categories-sub/categories.sub.model'

const createNestedSubCategoriesIntoDb = async (payload: TNestedSubCategory) => {
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

  const existingCategory = await NestedSubCategories.isNestedSubCategoryExists(
    payload.name
  )

  if (existingCategory) {
    throw new Error('Nested Sub Category already exists')
  }

  const result = await NestedSubCategories.create(payload)

  return result.populate('mainCategory')
}

const getAllNestedSubCategoriesIntoDb = async (
  query: Record<string, unknown>
) => {
  const subCategoriesQuery = new QueryBuilder(
    NestedSubCategories.find().populate('mainCategory'),
    query
  )
    .search(NestedSubCategoriesSearchableFields)
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

const getSingleNestedSubCategoriesFromDb = async (id: string) => {
  const result = await NestedSubCategories.findById(id)

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Requested Sub Category Not Found')
  }

  return result.populate('mainCategory')
}

const updateNestedSubCategoriesIntoDb = async (
  id: string,
  payload: Partial<TNestedSubCategory>
) => {
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

  const existingCategory = await NestedSubCategories.isNestedSubCategoryExists(
    payload?.name as string
  )

  if (existingCategory) {
    throw new Error('Sub Category already exists')
  }

  const isNestedSubCategoryExists = await NestedSubCategories.findById(id)

  if (!isNestedSubCategoryExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Requested Nested Sub Category Not Found'
    )
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

  const result = await NestedSubCategories.findByIdAndUpdate(
    id,
    modifiedUpdatedData,

    {
      new: true,
      runValidators: true,
    }
  )

  return result?.populate('mainCategory')
}

const deleteNestedSubCategoriesFromDb = async (id: string) => {
  const isNestedSubCategoryExists = await NestedSubCategories.findById(id)

  if (!isNestedSubCategoryExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Requested Nested Sub Category Not Found'
    )
  }

  const result = await NestedSubCategories.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  )

  return result
}

export const NestedSubCategoriesServices = {
  createNestedSubCategoriesIntoDb,
  getAllNestedSubCategoriesIntoDb,
  getSingleNestedSubCategoriesFromDb,
  updateNestedSubCategoriesIntoDb,
  deleteNestedSubCategoriesFromDb,
}
