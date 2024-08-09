import { z } from 'zod'

const createSubCategoriesValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    image: z
      .array(z.string().url())
      .min(1, { message: 'Main category image is required' }),
    isDeleted: z.boolean().default(false),
  }),
})

const updateSubCategoriesValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).optional(),
    image: z
      .array(z.string().url())
      .min(1, { message: 'Main category image is required' })
      .optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
})

export const SubCategoriesValidation = {
  createSubCategoriesValidationSchema,
  updateSubCategoriesValidationSchema,
}
