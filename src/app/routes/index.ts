import { Router } from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { MainCategoriesRoutes } from '../modules/categories-main/categories.main.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/auth',
    routes: UserRoutes,
  },
  {
    path: '/main-categories',
    routes: MainCategoriesRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.routes))

export default router
