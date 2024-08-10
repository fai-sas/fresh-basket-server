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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const products_constants_1 = require("./products.constants");
const products_model_1 = require("./products.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const categories_main_model_1 = require("../categories-main/categories.main.model");
const categories_sub_model_1 = require("../categories-sub/categories.sub.model");
const categories_nested_sub_model_1 = require("../categories-nested-sub/categories.nested.sub.model");
const createProductsIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isMainCategoryExists = yield categories_main_model_1.MainCategories.findById(payload === null || payload === void 0 ? void 0 : payload.mainCategory);
    if (!isMainCategoryExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Main Category Not Found');
    }
    const isSubCategoryExists = yield categories_sub_model_1.SubCategories.findById(payload === null || payload === void 0 ? void 0 : payload.subCategory);
    if (!isSubCategoryExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Sub Category Not Found');
    }
    if (payload.nestedSubCategory) {
        const isNestedSubCategoryExists = yield categories_nested_sub_model_1.NestedSubCategories.findById(payload.nestedSubCategory);
        if (!isNestedSubCategoryExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Requested Nested Sub Category Not Found');
        }
    }
    const existingProduct = yield products_model_1.Products.isProductExists(payload.name);
    if (existingProduct) {
        throw new Error('Product already exists');
    }
    const result = (yield products_model_1.Products.create(payload)).populate('mainCategory');
    return result;
});
const getAllProductsFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productsQuery = new QueryBuilder_1.default(products_model_1.Products.find().populate('mainCategory'), query)
        .search(products_constants_1.ProductsSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield productsQuery.countTotal();
    const result = yield productsQuery.modelQuery;
    return {
        meta,
        result,
    };
});
const getSingleProductFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Products.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Requested Product Not Found');
    }
    return result.populate('mainCategory');
});
const updateProductsIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.mainCategory) {
        const isMainCategoryExists = yield categories_main_model_1.MainCategories.findById(payload.mainCategory);
        if (!isMainCategoryExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Main Category Not Found');
        }
    }
    if (payload.subCategory) {
        const isSubCategoryExists = yield categories_sub_model_1.SubCategories.findById(payload.subCategory);
        if (!isSubCategoryExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Requested Sub Category Not Found');
        }
    }
    if (payload.nestedSubCategory) {
        const isNestedSubCategoryExists = yield categories_nested_sub_model_1.NestedSubCategories.findById(payload.nestedSubCategory);
        if (!isNestedSubCategoryExists) {
            throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Requested Nested Sub Category Not Found');
        }
    }
    const existingProduct = yield products_model_1.Products.isProductExists(payload === null || payload === void 0 ? void 0 : payload.name);
    if (existingProduct) {
        throw new Error('Product already exists');
    }
    const { image } = payload, remainingSubCategoryData = __rest(payload, ["image"]);
    const modifiedUpdatedData = Object.assign({}, remainingSubCategoryData);
    if (image && Object.keys(image).length) {
        for (const [key, value] of Object.entries(image)) {
            modifiedUpdatedData[`image.${key}`] = value;
        }
    }
    const result = yield products_model_1.Products.findByIdAndUpdate(id, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return result === null || result === void 0 ? void 0 : result.populate('mainCategory');
});
const deleteProductsFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExists = yield products_model_1.Products.findById(id);
    if (!isProductExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product Not Found');
    }
    const result = yield products_model_1.Products.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.ProductsServices = {
    createProductsIntoDb,
    getAllProductsFromDb,
    getSingleProductFromDb,
    updateProductsIntoDb,
    deleteProductsFromDb,
};
