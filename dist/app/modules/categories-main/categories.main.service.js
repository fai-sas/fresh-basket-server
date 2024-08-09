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
exports.MainCategoriesServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const categories_main_constants_1 = require("./categories.main.constants");
const categories_main_model_1 = require("./categories.main.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createMainCategoriesIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingCategory = yield categories_main_model_1.MainCategories.isMainCategoryExists(payload.name);
    if (existingCategory) {
        throw new Error('Main Category already exists');
    }
    const result = yield categories_main_model_1.MainCategories.create(payload);
    return result;
});
const getAllMainCategoriesIntoDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const mainCategoriesQuery = new QueryBuilder_1.default(categories_main_model_1.MainCategories.find(), query)
        .search(categories_main_constants_1.MainCategoriesSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield mainCategoriesQuery.countTotal();
    const result = yield mainCategoriesQuery.modelQuery;
    return {
        meta,
        result,
    };
});
const getSingleMainCategoriesFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield categories_main_model_1.MainCategories.findById(id);
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Requested Main Category Not Found');
    }
    return result;
});
const updateMainCategoriesIntoDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const existingCategory = yield categories_main_model_1.MainCategories.isMainCategoryExists(payload === null || payload === void 0 ? void 0 : payload.name);
    if (existingCategory) {
        throw new Error('Main Category already exists');
    }
    const isMainCategoryExists = yield categories_main_model_1.MainCategories.findById(id);
    if (!isMainCategoryExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Requested Main Category Not Found');
    }
    const { image } = payload, remainingStudentData = __rest(payload, ["image"]);
    const modifiedUpdatedData = Object.assign({}, remainingStudentData);
    if (image && Object.keys(image).length) {
        for (const [key, value] of Object.entries(image)) {
            modifiedUpdatedData[`image.${key}`] = value;
        }
    }
    const result = yield categories_main_model_1.MainCategories.findByIdAndUpdate(id, modifiedUpdatedData, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteMainCategoriesFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isCarExists = yield categories_main_model_1.MainCategories.findById(id);
    if (!isCarExists) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Requested Main Category Not Found');
    }
    const result = yield categories_main_model_1.MainCategories.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.MainCategoriesServices = {
    createMainCategoriesIntoDb,
    getAllMainCategoriesIntoDb,
    getSingleMainCategoriesFromDb,
    updateMainCategoriesIntoDb,
    deleteMainCategoriesFromDb,
};
