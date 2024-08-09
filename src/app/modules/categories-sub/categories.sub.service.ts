import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import { SubCategoriesSearchableFields } from './categories.sub.constants'
import { TSubCategory } from './categories.sub.interface'
import { SubCategories } from './categories.sub.model'
import AppError from '../../errors/AppError'
import { MainCategories } from '../categories-main/categories.main.model'

const createSubCategoriesIntoDb = async (payload: TSubCategory) => {
  const isMainCategoryExists = await MainCategories.findById(
    payload?.mainCategory
  )

  if (!isMainCategoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Main Category Not Found')
  }

  const existingCategory = await SubCategories.isSubCategoryExists(payload.name)

  if (existingCategory) {
    throw new Error('Sub Category already exists')
  }

  const result = (await SubCategories.create(payload)).populate('mainCategory')

  return result
}

const getAllSubCategoriesIntoDb = async (query: Record<string, unknown>) => {
  const subCategoriesQuery = new QueryBuilder(
    SubCategories.find().populate('mainCategory'),
    query
  )
    .search(SubCategoriesSearchableFields)
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

const getSingleSubCategoriesFromDb = async (id: string) => {
  const result = await SubCategories.findById(id)

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Requested Sub Category Not Found')
  }

  return result.populate('mainCategory')
}

const updateSubCategoriesIntoDb = async (
  id: string,
  payload: Partial<TSubCategory>
) => {
  const existingCategory = await SubCategories.isSubCategoryExists(
    payload?.name as string
  )

  if (existingCategory) {
    throw new Error('Sub Category already exists')
  }

  const isSubCategoryExists = await SubCategories.findById(id)

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

  const result = await SubCategories.findByIdAndUpdate(
    id,
    modifiedUpdatedData,

    {
      new: true,
      runValidators: true,
    }
  )

  return result
}

const deleteSubCategoriesFromDb = async (id: string) => {
  const isSubCategoryExists = await SubCategories.findById(id)

  if (!isSubCategoryExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Requested Sub Category Not Found')
  }

  const result = await SubCategories.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  )

  return result
}

export const SubCategoriesServices = {
  createSubCategoriesIntoDb,
  getAllSubCategoriesIntoDb,
  getSingleSubCategoriesFromDb,
  updateSubCategoriesIntoDb,
  deleteSubCategoriesFromDb,
}
