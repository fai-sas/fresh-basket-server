"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestedSubCategoriesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const categories_nested_sub_controller_1 = require("./categories.nested.sub.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const categories_nested_sub_validation_1 = require("./categories.nested.sub.validation");
const router = express_1.default.Router();
router.post('/create-nested-sub-category', (0, validateRequest_1.default)(categories_nested_sub_validation_1.NestedSubCategoriesValidation.createNestedSubCategoriesValidationSchema), categories_nested_sub_controller_1.NestedSubCategoriesControllers.createNestedSubCategory);
router.get('/', categories_nested_sub_controller_1.NestedSubCategoriesControllers.getAllNestedSubCategories);
router.get('/:id', categories_nested_sub_controller_1.NestedSubCategoriesControllers.getSingleNestedSubCategory);
router.put('/:id', (0, validateRequest_1.default)(categories_nested_sub_validation_1.NestedSubCategoriesValidation.updateNestedSubCategoriesValidationSchema), categories_nested_sub_controller_1.NestedSubCategoriesControllers.updateNestedSubCategory);
router.delete('/:id', categories_nested_sub_controller_1.NestedSubCategoriesControllers.deleteNestedSubCategory);
exports.NestedSubCategoriesRoutes = router;
