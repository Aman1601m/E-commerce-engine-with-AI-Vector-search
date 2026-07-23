import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().trim().min(3).max(150).required(),

  slug: Joi.string().trim().required(),

  description: Joi.string().allow("").optional(),

  brand: Joi.string().required(),

  category: Joi.string().required(),

  sku: Joi.string().required(),

  price: Joi.number().positive().required(),

  discountPrice: Joi.number().min(0).optional(),

  currency: Joi.string().default("INR"),

  stock: Joi.number().integer().min(0).required(),

  lowStockThreshold: Joi.number().integer().min(0).default(5),

  thumbnail: Joi.string().uri().required(),

  images: Joi.array().items(Joi.string().uri()),

  tags: Joi.array().items(Joi.string()),

  averageRating: Joi.number().min(0).max(5).default(0),

  totalReviews: Joi.number().integer().min(0).default(0),

  views: Joi.number().integer().min(0).default(0),

  salesCount: Joi.number().integer().min(0).default(0),

  isActive: Joi.boolean().default(true),

  isFeatured: Joi.boolean().default(false),

  metaTitle: Joi.string().allow(""),

  metaDescription: Joi.string().allow("")
});

export const updateProductSchema = createProductSchema.fork(
  Object.keys(createProductSchema.describe().keys),
  (field) => field.optional()
);