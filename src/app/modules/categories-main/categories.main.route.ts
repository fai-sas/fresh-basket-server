import express from 'express'
import { MainCategoriesControllers } from './categories.main.controller'
import validateRequest from '../../middlewares/validateRequest'
import { MainCategoriesValidation } from './categories.main.validation'

const router = express.Router()

router.post(
  '/create-main-category',
  validateRequest(
    MainCategoriesValidation.createMainCategoriesValidationSchema
  ),
  MainCategoriesControllers.createMainCategory
)

router.get('/', MainCategoriesControllers.getAllMainCategories)

router.get('/:id', MainCategoriesControllers.getSingleMainCategory)

router.put(
  '/:id',
  validateRequest(
    MainCategoriesValidation.updateMainCategoriesValidationSchema
  ),
  MainCategoriesControllers.updateMainCategory
)

router.delete('/:id', MainCategoriesControllers.deleteMainCategory)

export const MainCategoriesRoutes = router
