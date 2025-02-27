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
exports.SubCategoriesServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const categories_sub_constants_1 = require("./categories.sub.constants");
const categories_sub_model_1 = require("./categories.sub.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const categories_main_model_1 = require("../categories-main/categories.main.model");
const createSubCategoriesIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isMainCategoryExists = yield categories_main_model_1.MainCategories.findById(payload === null || payload === void 0 ? void 0 : payload.mainCategory);
    if (!isMainCategoryExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Main Category Not Found');
    }
    const existingCategory = yield categories_sub_model_1.SubCategories.isSubCategoryExists(payload.name);
    if (existingCategory) {
        throw new Error('Sub Category already exists');
    }
    const result = yield categories_sub_model_1.SubCategories.create(payload);
    return result.populate('mainCategory');
});
const getAllSubCategoriesIntoDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const subCategoriesQuery = new QueryBuilder_1.default(categories_sub_model_1.SubCategories.find().populate('mainCategory'), query)
        .search(categories_sub_constants_1.SubCategoriesSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield subCategoriesQuery.countTotal();
    const result = yield subCategoriesQuery.modelQuery;
    return {
        meta,
        result,
    };
});
const getSingleSubCategoriesFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield categories_sub_model_1.SubCategories.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Requested Sub Category Not Found');
    }
    return result.populate('mainCategory');
});
const updateSubCategoriesIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isMainCategoryExists = yield categories_main_model_1.MainCategories.findById(payload === null || payload === void 0 ? void 0 : payload.mainCategory);
    if (!isMainCategoryExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Main Category Not Found');
    }
    const existingCategory = yield categories_sub_model_1.SubCategories.isSubCategoryExists(payload === null || payload === void 0 ? void 0 : payload.name);
    if (existingCategory) {
        throw new Error('Sub Category already exists');
    }
    const isSubCategoryExists = yield categories_sub_model_1.SubCategories.findById(id);
    if (!isSubCategoryExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Requested Sub Category Not Found');
    }
    const { image } = payload, remainingSubCategoryData = __rest(payload, ["image"]);
    const modifiedUpdatedData = Object.assign({}, remainingSubCategoryData);
    if (image && Object.keys(image).length) {
        for (const [key, value] of Object.entries(image)) {
            modifiedUpdatedData[`image.${key}`] = value;
        }
    }
    const result = yield categories_sub_model_1.SubCategories.findByIdAndUpdate(id, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return result === null || result === void 0 ? void 0 : result.populate('mainCategory');
});
const deleteSubCategoriesFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isSubCategoryExists = yield categories_sub_model_1.SubCategories.findById(id);
    if (!isSubCategoryExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Requested Sub Category Not Found');
    }
    const result = yield categories_sub_model_1.SubCategories.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.SubCategoriesServices = {
    createSubCategoriesIntoDb,
    getAllSubCategoriesIntoDb,
    getSingleSubCategoriesFromDb,
    updateSubCategoriesIntoDb,
    deleteSubCategoriesFromDb,
};
