"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const categories_main_route_1 = require("../modules/categories-main/categories.main.route");
const categories_sub_route_1 = require("../modules/categories-sub/categories.sub.route");
const categories_nested_sub_route_1 = require("../modules/categories-nested-sub/categories.nested.sub.route");
const products_route_1 = require("../modules/products/products.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        routes: user_route_1.UserRoutes,
    },
    {
        path: '/main-categories',
        routes: categories_main_route_1.MainCategoriesRoutes,
    },
    {
        path: '/sub-categories',
        routes: categories_sub_route_1.SubCategoriesRoutes,
    },
    {
        path: '/nested-sub-categories',
        routes: categories_nested_sub_route_1.NestedSubCategoriesRoutes,
    },
    {
        path: '/products',
        routes: products_route_1.ProductsRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.routes));
exports.default = router;
