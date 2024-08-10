import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { ProductsServices } from './products.service'

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductsServices.createProductsIntoDb(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product created successfully',
    data: result,
  })
})

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductsServices.getAllProductsFromDb(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully',
    meta: result.meta,
    data: result.result,
  })
})

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ProductsServices.getSingleProductFromDb(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product retrieved successfully',
    data: result,
  })
})

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ProductsServices.updateProductsIntoDb(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product updated successfully',
    data: result,
  })
})

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ProductsServices.deleteProductsFromDb(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product Deleted successfully',
    data: result,
  })
})

export const ProductsControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
}
