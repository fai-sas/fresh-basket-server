import { Router } from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { MainCategoriesRoutes } from '../modules/categories-main/categories.main.route'
import { SubCategoriesRoutes } from '../modules/categories-sub/categories.sub.route'

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
  {
    path: '/sub-categories',
    routes: SubCategoriesRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.routes))

export default router
