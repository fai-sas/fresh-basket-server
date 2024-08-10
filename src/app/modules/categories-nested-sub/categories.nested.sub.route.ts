import express from 'express'
import { NestedSubCategoriesControllers } from './categories.nested.sub.controller'
import validateRequest from '../../middlewares/validateRequest'
import { NestedSubCategoriesValidation } from './categories.nested.sub.validation'

const router = express.Router()

router.post(
  '/create-nested-sub-category',
  validateRequest(
    NestedSubCategoriesValidation.createNestedSubCategoriesValidationSchema
  ),
  NestedSubCategoriesControllers.createNestedSubCategory
)

router.get('/', NestedSubCategoriesControllers.getAllNestedSubCategories)

router.get('/:id', NestedSubCategoriesControllers.getSingleNestedSubCategory)

router.put(
  '/:id',
  validateRequest(
    NestedSubCategoriesValidation.updateNestedSubCategoriesValidationSchema
  ),
  NestedSubCategoriesControllers.updateNestedSubCategory
)

router.delete('/:id', NestedSubCategoriesControllers.deleteNestedSubCategory)

export const NestedSubCategoriesRoutes = router
