import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import { MainCategoriesSearchableFields } from './categories.main.constants'
import { TMainCategory } from './categories.main.interface'
import { MainCategories } from './categories.main.model'
import AppError from '../../errors/AppError'

const createMainCategoriesIntoDb = async (payload: TMainCategory) => {
  const existingCategory = await MainCategories.isMainCategoryExists(
    payload.name
  )

  if (existingCategory) {
    throw new Error('Main Category already exists')
  }

  const result = await MainCategories.create(payload)

  return result
}

const getAllMainCategoriesIntoDb = async (query: Record<string, unknown>) => {
  const mainCategoriesQuery = new QueryBuilder(MainCategories.find(), query)
    .search(MainCategoriesSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await mainCategoriesQuery.countTotal()
  const result = await mainCategoriesQuery.modelQuery

  return {
    meta,
    result,
  }
}

const getSingleMainCategoriesFromDb = async (id: string) => {
  const result = await MainCategories.findById(id)

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Requested Main Category Not Found'
    )
  }

  return result
}

const updateMainCategoriesIntoDb = async (
  id: string,
  payload: Partial<TMainCategory>
) => {
  const existingCategory = await MainCategories.isMainCategoryExists(
    payload?.name as string
  )

  if (existingCategory) {
    throw new Error('Main Category already exists')
  }

  const isMainCategoryExists = await MainCategories.findById(id)

  if (!isMainCategoryExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Requested Main Category Not Found'
    )
  }

  const { image, ...remainingStudentData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  }

  if (image && Object.keys(image).length) {
    for (const [key, value] of Object.entries(image)) {
      modifiedUpdatedData[`image.${key}`] = value
    }
  }

  const result = await MainCategories.findByIdAndUpdate(
    id,
    modifiedUpdatedData,

    {
      new: true,
      runValidators: true,
    }
  )

  return result
}

const deleteMainCategoriesFromDb = async (id: string) => {
  const isCarExists = await MainCategories.findById(id)

  if (!isCarExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Requested Main Category Not Found'
    )
  }

  const result = await MainCategories.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  )

  return result
}

export const MainCategoriesServices = {
  createMainCategoriesIntoDb,
  getAllMainCategoriesIntoDb,
  getSingleMainCategoriesFromDb,
  updateMainCategoriesIntoDb,
  deleteMainCategoriesFromDb,
}
