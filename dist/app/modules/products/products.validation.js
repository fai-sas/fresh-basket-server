"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsValidation = void 0;
const zod_1 = require("zod");
const createProductsValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ required_error: 'Product name is required' })
            .max(50, 'Name cannot be more than 50 characters'),
        mainCategory: zod_1.z
            .string({ required_error: 'Main category is required' })
            .refine((value) => value.match(/^[a-fA-F0-9]{24}$/), {
            message: 'Invalid main category ID',
        }),
        subCategory: zod_1.z
            .string({ required_error: 'Subcategory is required' })
            .refine((value) => value.match(/^[a-fA-F0-9]{24}$/), {
            message: 'Invalid subcategory ID',
        }),
        nestedSubCategory: zod_1.z
            .string()
            .refine((value) => value.match(/^[a-fA-F0-9]{24}$/), {
            message: 'Invalid nested subcategory ID',
        })
            .optional(),
        image: zod_1.z
            .array(zod_1.z.string().url())
            .min(1, { message: 'At least one image is required' }),
        description: zod_1.z.string({
            required_error: 'Product description is required',
        }),
        price: zod_1.z.number({ required_error: 'Product price is required' }),
        unit: zod_1.z.string({ required_error: 'Unit of measurement is required' }),
        quantity: zod_1.z.string({ required_error: 'Quantity is required' }),
        stock: zod_1.z.number({ required_error: 'Stock quantity is required' }),
        sku: zod_1.z.string({ required_error: 'SKU is required' }),
        availability: zod_1.z.enum(['in stock', 'out of stock'], {
            required_error: 'Availability status is required',
        }),
        ratings: zod_1.z.number({ required_error: 'Product rating is required' }),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
const updateProductsValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .max(50, 'Name cannot be more than 50 characters')
            .optional(),
        mainCategory: zod_1.z
            .string()
            .refine((value) => value.match(/^[a-fA-F0-9]{24}$/), {
            message: 'Invalid main category ID',
        })
            .optional(),
        subCategory: zod_1.z
            .string()
            .refine((value) => value.match(/^[a-fA-F0-9]{24}$/), {
            message: 'Invalid subcategory ID',
        })
            .optional(),
        nestedSubCategory: zod_1.z
            .string()
            .refine((value) => value.match(/^[a-fA-F0-9]{24}$/), {
            message: 'Invalid nested subcategory ID',
        })
            .optional(),
        image: zod_1.z
            .array(zod_1.z.string().url())
            .min(1, { message: 'At least one image is required' })
            .optional(),
        description: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        unit: zod_1.z.string().optional(),
        quantity: zod_1.z.string().optional(),
        stock: zod_1.z.number().optional(),
        sku: zod_1.z.string().optional(),
        availability: zod_1.z.enum(['in stock', 'out of stock']).optional(),
        ratings: zod_1.z.number().optional(),
        isDeleted: zod_1.z.boolean().default(false).optional(),
    }),
});
exports.ProductsValidation = {
    createProductsValidationSchema,
    updateProductsValidationSchema,
};
