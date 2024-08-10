"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategoriesValidation = void 0;
const zod_1 = require("zod");
const createSubCategoriesValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        image: zod_1.z
            .array(zod_1.z.string().url())
            .min(1, { message: 'Sub category image is required' }),
        mainCategory: zod_1.z
            .string({ required_error: 'Main category is required' })
            .refine((value) => value.match(/^[a-fA-F0-9]{24}$/), {
            message: 'Invalid subcategory ID',
        }),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
const updateSubCategoriesValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }).optional(),
        image: zod_1.z
            .array(zod_1.z.string().url())
            .min(1, { message: 'Sub category image is required' })
            .optional(),
        mainCategory: zod_1.z
            .string({ required_error: 'Main category is required' })
            .refine((value) => value.match(/^[a-fA-F0-9]{24}$/), {
            message: 'Invalid subcategory ID',
        })
            .optional(),
        isDeleted: zod_1.z.boolean().default(false).optional(),
    }),
});
exports.SubCategoriesValidation = {
    createSubCategoriesValidationSchema,
    updateSubCategoriesValidationSchema,
};
