import { z } from 'zod'

const createProductsValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Product name is required' })
      .max(50, 'Name cannot be more than 50 characters'),
    mainCategory: z
      .string({ required_error: 'Main category is required' })
      .refine((value) => value.match(/^[a-fA-F0-9]{24}$/), {
        message: 'Invalid main category ID',
      }),
    subCategory: z
      .string({ required_error: 'Subcategory is required' })
      .refine((value) => value.match(/^[a-fA-F0-9]{24}$/), {
        message: 'Invalid subcategory ID',
      }),
    nestedSubCategory: z
      .string()
      .refine((value) => value.match(/^[a-fA-F0-9]{24}$/), {
        message: 'Invalid nested subcategory ID',
      })
      .optional(),
    image: z
      .array(z.string().url())
      .min(1, { message: 'At least one image is required' }),
    description: z.string({
      required_error: 'Product description is required',
    }),
    price: z.number({ required_error: 'Product price is required' }),
    unit: z.string({ required_error: 'Unit of measurement is required' }),
    quantity: z.string({ required_error: 'Quantity is required' }),
    stock: z.number({ required_error: 'Stock quantity is required' }),
    sku: z.string({ required_error: 'SKU is required' }),
    availability: z.enum(['in stock', 'out of stock'], {
      required_error: 'Availability status is required',
    }),
    ratings: z.number({ required_error: 'Product rating is required' }),
    isDeleted: z.boolean().default(false),
  }),
})

const updateProductsValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .max(50, 'Name cannot be more than 50 characters')
      .optional(),
    mainCategory: z
      .string()
      .refine((value) => value.match(/^[a-fA-F0-9]{24}$/), {
        message: 'Invalid main category ID',
      })
      .optional(),
    subCategory: z
      .string()
      .refine((value) => value.match(/^[a-fA-F0-9]{24}$/), {
        message: 'Invalid subcategory ID',
      })
      .optional(),
    nestedSubCategory: z
      .string()
      .refine((value) => value.match(/^[a-fA-F0-9]{24}$/), {
        message: 'Invalid nested subcategory ID',
      })
      .optional(),
    image: z
      .array(z.string().url())
      .min(1, { message: 'At least one image is required' })
      .optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    unit: z.string().optional(),
    quantity: z.string().optional(),
    stock: z.number().optional(),
    sku: z.string().optional(),
    availability: z.enum(['in stock', 'out of stock']).optional(),
    ratings: z.number().optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
})

export const ProductsValidation = {
  createProductsValidationSchema,
  updateProductsValidationSchema,
}
