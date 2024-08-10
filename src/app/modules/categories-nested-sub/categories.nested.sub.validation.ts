import { z } from 'zod'

const createNestedSubCategoriesValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    image: z
      .array(z.string().url())
      .min(1, { message: 'Nested sub category image is required' }),
    subCategory: z
      .string({ required_error: 'Subcategory is required' })
      .refine((value) => value.match(/^[a-fA-F0-9]{24}$/), {
        message: 'Invalid subcategory ID',
      }),
    isDeleted: z.boolean().default(false),
  }),
})

const updateNestedSubCategoriesValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    image: z
      .array(z.string().url())
      .min(1, { message: 'Nested sub category image is required' })
      .optional(),
    subCategory: z
      .string({ required_error: 'Subcategory is required' })
      .refine((value) => value.match(/^[a-fA-F0-9]{24}$/), {
        message: 'Invalid subcategory ID',
      })
      .optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
})

export const NestedSubCategoriesValidation = {
  createNestedSubCategoriesValidationSchema,
  updateNestedSubCategoriesValidationSchema,
}
