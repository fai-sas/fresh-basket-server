"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("./products.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const products_validation_1 = require("./products.validation");
const router = express_1.default.Router();
router.post('/create-product', (0, validateRequest_1.default)(products_validation_1.ProductsValidation.createProductsValidationSchema), products_controller_1.ProductsControllers.createProduct);
router.get('/', products_controller_1.ProductsControllers.getAllProducts);
router.get('/:id', products_controller_1.ProductsControllers.getSingleProduct);
router.put('/:id', (0, validateRequest_1.default)(products_validation_1.ProductsValidation.createProductsValidationSchema), products_controller_1.ProductsControllers.updateProduct);
router.delete('/:id', products_controller_1.ProductsControllers.deleteProduct);
exports.ProductsRoutes = router;
