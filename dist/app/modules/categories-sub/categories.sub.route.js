"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoriesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const categories_sub_controller_1 = require("./categories.sub.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const categories_sub_validation_1 = require("./categories.sub.validation");
const router = express_1.default.Router();
router.post('/create-sub-category', (0, validateRequest_1.default)(categories_sub_validation_1.SubCategoriesValidation.createSubCategoriesValidationSchema), categories_sub_controller_1.SubCategoriesControllers.createSubCategory);
router.get('/', categories_sub_controller_1.SubCategoriesControllers.getAllSubCategories);
router.get('/:id', categories_sub_controller_1.SubCategoriesControllers.getSingleSubCategory);
router.put('/:id', (0, validateRequest_1.default)(categories_sub_validation_1.SubCategoriesValidation.updateSubCategoriesValidationSchema), categories_sub_controller_1.SubCategoriesControllers.updateSubCategory);
router.delete('/:id', categories_sub_controller_1.SubCategoriesControllers.deleteSubCategory);
exports.SubCategoriesRoutes = router;
