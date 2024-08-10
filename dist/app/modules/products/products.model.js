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
exports.Products = void 0;
const mongoose_1 = require("mongoose");
const productsSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
    },
    mainCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'MainCategories',
        required: [true, 'Main category is required'],
    },
    subCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'SubCategories',
        required: [true, 'Subcategory is required'],
    },
    nestedSubCategory: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'NestedSubCategories',
    },
    image: {
        type: [String],
        required: [true, 'At least one image is required'],
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
    },
    unit: {
        type: String,
        required: [true, 'Unit of measurement is required'],
    },
    quantity: {
        type: String,
        required: [true, 'Quantity is required'],
    },
    stock: {
        type: Number,
        required: [true, 'Stock quantity is required'],
    },
    sku: {
        type: String,
        required: [true, 'SKU is required'],
    },
    availability: {
        type: String,
        enum: ['in stock', 'out of stock'],
        required: [true, 'Availability status is required'],
    },
    ratings: {
        type: Number,
        required: [true, 'Product rating is required'],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
// filter out deleted documents
productsSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
productsSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
productsSchema.statics.isProductExists = function (name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.Products.findOne({ name });
    });
};
exports.Products = (0, mongoose_1.model)('Products', productsSchema);
