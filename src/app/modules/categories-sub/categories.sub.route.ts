import express from 'express'
import { SubCategoriesControllers } from './categories.sub.controller'
import validateRequest from '../../middlewares/validateRequest'
import { SubCategoriesValidation } from './categories.sub.validation'

const router = express.Router()

router.post(
  '/create-sub-category',
  validateRequest(SubCategoriesValidation.createSubCategoriesValidationSchema),
  SubCategoriesControllers.createSubCategory
)

router.get('/', SubCategoriesControllers.getAllSubCategories)

router.get('/:id', SubCategoriesControllers.getSingleSubCategory)

router.put(
  '/:id',
  validateRequest(SubCategoriesValidation.updateSubCategoriesValidationSchema),
  SubCategoriesControllers.updateSubCategory
)

router.delete('/:id', SubCategoriesControllers.deleteSubCategory)

export const SubCategoriesRoutes = router
