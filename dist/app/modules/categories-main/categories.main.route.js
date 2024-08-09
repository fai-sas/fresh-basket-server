"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainCategoriesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const categories_main_controller_1 = require("./categories.main.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const categories_main_validation_1 = require("./categories.main.validation");
const router = express_1.default.Router();
router.post('/create-main-category', (0, validateRequest_1.default)(categories_main_validation_1.MainCategoriesValidation.createMainCategoriesValidationSchema), categories_main_controller_1.MainCategoriesControllers.createMainCategory);
router.get('/', categories_main_controller_1.MainCategoriesControllers.getAllMainCategories);
router.get('/:id', categories_main_controller_1.MainCategoriesControllers.getSingleMainCategory);
router.put('/:id', (0, validateRequest_1.default)(categories_main_validation_1.MainCategoriesValidation.updateMainCategoriesValidationSchema), categories_main_controller_1.MainCategoriesControllers.updateMainCategory);
router.delete('/:id', categories_main_controller_1.MainCategoriesControllers.deleteMainCategory);
exports.MainCategoriesRoutes = router;
