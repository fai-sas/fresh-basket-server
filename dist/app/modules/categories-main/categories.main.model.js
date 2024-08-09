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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainCategories = void 0;
const mongoose_1 = require("mongoose");
const mainCategoriesSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    image: {
        type: [String],
        required: [true, 'Please provide category image'],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// filter out deleted documents
mainCategoriesSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
mainCategoriesSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
mainCategoriesSchema.statics.isMainCategoryExists = function (name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.MainCategories.findOne({ name });
    });
};
exports.MainCategories = (0, mongoose_1.model)('MainCategories', mainCategoriesSchema);
