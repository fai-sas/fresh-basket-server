import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { MainCategoriesServices } from './categories.main.service'

const createMainCategory = catchAsync(async (req, res) => {
  const result = await MainCategoriesServices.createMainCategoriesIntoDb(
    req.body
  )

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Main Category created successfully',
    data: result,
  })
})

const getAllMainCategories = catchAsync(async (req, res) => {
  const result = await MainCategoriesServices.getAllMainCategoriesIntoDb(
    req.query
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Main Categories retrieved successfully',
    meta: result.meta,
    data: result.result,
  })
})

const getSingleMainCategory = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await MainCategoriesServices.getSingleMainCategoriesFromDb(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Main Category retrieved successfully',
    data: result,
  })
})

const updateMainCategory = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await MainCategoriesServices.updateMainCategoriesIntoDb(
    id,
    req.body
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Main Category updated successfully',
    data: result,
  })
})

const deleteMainCategory = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await MainCategoriesServices.deleteMainCategoriesFromDb(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Main Category Deleted successfully',
    data: result,
  })
})

export const MainCategoriesControllers = {
  createMainCategory,
  getAllMainCategories,
  getSingleMainCategory,
  updateMainCategory,
  deleteMainCategory,
}
