import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { SubCategoriesServices } from './categories.sub.service'

const createSubCategory = catchAsync(async (req, res) => {
  const result = await SubCategoriesServices.createSubCategoriesIntoDb(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Sub Category created successfully',
    data: result,
  })
})

const getAllSubCategories = catchAsync(async (req, res) => {
  const result = await SubCategoriesServices.getAllSubCategoriesIntoDb(
    req.query
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub Categories retrieved successfully',
    meta: result.meta,
    data: result.result,
  })
})

const getSingleSubCategory = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await SubCategoriesServices.getSingleSubCategoriesFromDb(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub Category retrieved successfully',
    data: result,
  })
})

const updateSubCategory = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await SubCategoriesServices.updateSubCategoriesIntoDb(
    id,
    req.body
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub Category updated successfully',
    data: result,
  })
})

const deleteSubCategory = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await SubCategoriesServices.deleteSubCategoriesFromDb(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub Category Deleted successfully',
    data: result,
  })
})

export const SubCategoriesControllers = {
  createSubCategory,
  getAllSubCategories,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
}
