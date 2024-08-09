"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const categories_main_route_1 = require("../modules/categories-main/categories.main.route");
const categories_sub_route_1 = require("../modules/categories-sub/categories.sub.route");
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
];
moduleRoutes.forEach((route) => router.use(route.path, route.routes));
exports.default = router;
