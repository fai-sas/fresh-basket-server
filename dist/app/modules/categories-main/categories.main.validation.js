"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainCategoriesValidation = void 0;
const zod_1 = require("zod");
const createMainCategoriesValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }),
        image: zod_1.z
            .array(zod_1.z.string().url())
            .min(1, { message: 'Main category image is required' }),
        isDeleted: zod_1.z.boolean().default(false),
    }),
});
const updateMainCategoriesValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }).optional(),
        image: zod_1.z
            .array(zod_1.z.string().url())
            .min(1, { message: 'Main category image is required' })
            .optional(),
        isDeleted: zod_1.z.boolean().default(false).optional(),
    }),
});
exports.MainCategoriesValidation = {
    createMainCategoriesValidationSchema,
    updateMainCategoriesValidationSchema,
};
