"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestedSubCategoriesControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const categories_nested_sub_service_1 = require("./categories.nested.sub.service");
const createNestedSubCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield categories_nested_sub_service_1.NestedSubCategoriesServices.createNestedSubCategoriesIntoDb(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: 'Nested Sub Category created successfully',
        data: result,
    });
}));
const getAllNestedSubCategories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield categories_nested_sub_service_1.NestedSubCategoriesServices.getAllNestedSubCategoriesIntoDb(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Nested Sub Categories retrieved successfully',
        meta: result.meta,
        data: result.result,
    });
}));
const getSingleNestedSubCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield categories_nested_sub_service_1.NestedSubCategoriesServices.getSingleNestedSubCategoriesFromDb(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Nested Sub Category retrieved successfully',
        data: result,
    });
}));
const updateNestedSubCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield categories_nested_sub_service_1.NestedSubCategoriesServices.updateNestedSubCategoriesIntoDb(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Nested Sub Category updated successfully',
        data: result,
    });
}));
const deleteNestedSubCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield categories_nested_sub_service_1.NestedSubCategoriesServices.deleteNestedSubCategoriesFromDb(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Nested Sub Category Deleted successfully',
        data: result,
    });
}));
exports.NestedSubCategoriesControllers = {
    createNestedSubCategory,
    getAllNestedSubCategories,
    getSingleNestedSubCategory,
    updateNestedSubCategory,
    deleteNestedSubCategory,
};
