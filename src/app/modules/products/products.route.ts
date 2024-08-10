import express from 'express'
import { ProductsControllers } from './products.controller'
import validateRequest from '../../middlewares/validateRequest'
import { ProductsValidation } from './products.validation'

const router = express.Router()

router.post(
  '/create-product',
  validateRequest(ProductsValidation.createProductsValidationSchema),
  ProductsControllers.createProduct
)

router.get('/', ProductsControllers.getAllProducts)

router.get('/:id', ProductsControllers.getSingleProduct)

router.put(
  '/:id',
  validateRequest(ProductsValidation.updateProductsValidationSchema),
  ProductsControllers.updateProduct
)

router.delete('/:id', ProductsControllers.deleteProduct)

export const ProductsRoutes = router
