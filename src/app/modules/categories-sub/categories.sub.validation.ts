import { z } from 'zod'

const createSubCategoriesValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    image: z
      .array(z.string().url())
      .min(1, { message: 'Sub category image is required' }),
    mainCategory: z
      .string({ required_error: 'Main category is required' })
      .refine((value) => value.match(/^[a-fA-F0-9]{24}$/), {
        message: 'Invalid subcategory ID',
      }),
    isDeleted: z.boolean().default(false),
  }),
})

const updateSubCategoriesValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    image: z
      .array(z.string().url())
      .min(1, { message: 'Sub category image is required' })
      .optional(),
    mainCategory: z
      .string({ required_error: 'Main category is required' })
      .refine((value) => value.match(/^[a-fA-F0-9]{24}$/), {
        message: 'Invalid subcategory ID',
      })
      .optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
})

export const SubCategoriesValidation = {
  createSubCategoriesValidationSchema,
  updateSubCategoriesValidationSchema,
}
