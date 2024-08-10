import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { NestedSubCategoriesServices } from './categories.nested.sub.service'

const createNestedSubCategory = catchAsync(async (req, res) => {
  const result =
    await NestedSubCategoriesServices.createNestedSubCategoriesIntoDb(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Nested Sub Category created successfully',
    data: result,
  })
})

const getAllNestedSubCategories = catchAsync(async (req, res) => {
  const result =
    await NestedSubCategoriesServices.getAllNestedSubCategoriesIntoDb(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Nested Sub Categories retrieved successfully',
    meta: result.meta,
    data: result.result,
  })
})

const getSingleNestedSubCategory = catchAsync(async (req, res) => {
  const { id } = req.params
  const result =
    await NestedSubCategoriesServices.getSingleNestedSubCategoriesFromDb(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Nested Sub Category retrieved successfully',
    data: result,
  })
})

const updateNestedSubCategory = catchAsync(async (req, res) => {
  const { id } = req.params
  const result =
    await NestedSubCategoriesServices.updateNestedSubCategoriesIntoDb(
      id,
      req.body
    )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Nested Sub Category updated successfully',
    data: result,
  })
})

const deleteNestedSubCategory = catchAsync(async (req, res) => {
  const { id } = req.params
  const result =
    await NestedSubCategoriesServices.deleteNestedSubCategoriesFromDb(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Nested Sub Category Deleted successfully',
    data: result,
  })
})

export const NestedSubCategoriesControllers = {
  createNestedSubCategory,
  getAllNestedSubCategories,
  getSingleNestedSubCategory,
  updateNestedSubCategory,
  deleteNestedSubCategory,
}
