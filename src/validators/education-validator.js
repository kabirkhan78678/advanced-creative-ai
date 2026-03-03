import Joi from "joi";

export const createCategorySchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.empty": "Category name is required",
      "any.required": "Category name is required"
    }),
  icon: Joi.string()
    .allow(null, "")
    .optional()
});

export const updateCategorySchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .optional(),
  icon: Joi.string()
    .allow(null, "")
    .optional()
});


export const createSubCategorySchema = Joi.object({
  category_id: Joi.number()
    .integer()
    .required()
    .messages({
      "number.base": "Category ID must be a number",
      "number.integer": "Category ID must be an integer",
      "any.required": "Category ID is required"
    }),
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.base": "Sub category name must be a string",
      "string.empty": "Sub category name is required",
      "string.min": "Sub category name must be at least 2 characters",
      "string.max": "Sub category name must be less than 100 characters"
    }),
  status: Joi.string().valid("active", "inactive")
});

export const updateSubCategorySchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(100)
    .optional()
    .messages({
      "string.base": "Sub category name must be a string",
      "string.min": "Sub category name must be at least 2 characters",
      "string.max": "Sub category name must be less than 100 characters"
    }),
  status: Joi.string().valid("active", "inactive")
})
  .min(1);

export const createCourseToolSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      "string.base": "Name must be a string",
      "string.empty": "Name is required",
      "string.min": "Name must be at least 2 characters",
      "any.required": "Name is required"
    }),
  icon: Joi.string()
    .required()
    .messages({
      "string.base": "Icon must be a string",
      "any.required": "Icon is required"
    }),
  status: Joi.string()
    .valid("active", "inactive")
    .default("active")
    .messages({
      "any.only": "Status must be either active or inactive"
    })
});

export const updateCourseToolSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .optional(),
  icon: Joi.string()
    .optional(),
  status: Joi.string()
    .valid("active", "inactive")
    .optional()
})
.min(1) 
.messages({
  "object.min": "At least one field is required to update"
});

export const createInstructorSchema = Joi.object({
  education_subcategory_id: Joi.number()
    .integer()
    .required()
    .messages({
      "any.required": "Sub Category ID is required",
      "number.base": "Sub Category ID must be a number"
    }),
  full_name: Joi.string().min(3).required(),
  phone: Joi.string().min(8).required(),
  title: Joi.string().required(),
  biography: Joi.string().required(),
  images: Joi.string().optional(),
  website: Joi.string().trim().uri().allow(null, ""),
  facebook: Joi.string().allow(null, ""),
  instagram: Joi.string().allow(null, ""),
  twitter: Joi.string().allow(null, ""),
  whatsapp: Joi.string().allow(null, ""),
  linkedin: Joi.string().allow(null, ""),
  youtube: Joi.string().trim().uri().allow(null, "")
});

export const updateInstructorSchema = Joi.object({
  education_subcategory_id: Joi.number()
    .integer()
    .required()
    .messages({
      "any.required": "Sub Category ID is required",
      "number.base": "Sub Category ID must be a number"
    }),
  full_name: Joi.string().min(3).optional(),
  phone: Joi.string().min(8).optional(),
  title: Joi.string().optional(),
  biography: Joi.string().optional(),
  images: Joi.string().optional(),
  website: Joi.string().uri().allow(null, ""),
  facebook: Joi.string().allow(null, ""),
  instagram: Joi.string().allow(null, ""),
  twitter: Joi.string().allow(null, ""),
  whatsapp: Joi.string().allow(null, ""),
  linkedin: Joi.string().allow(null, ""),
  youtube: Joi.string().uri().allow(null, ""),
  status: Joi.string().valid("pending", "approved", "rejected").optional()
});


export const createCourseSchema = Joi.object({
  instructor_id: Joi.number().integer().required(),
  category_id: Joi.number().integer().required(),
  subcategory_id: Joi.number().integer().required(),
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().required(),
  price: Joi.number().precision(2).min(0).required(),
  level: Joi.string().valid("beginner", "intermediate", "expert", "all").required(),
  language: Joi.string().trim().min(2).max(50).required(),
  duration: Joi.string().required(),
  thumbnail: Joi.string().allow(null, ""),
  status: Joi.string()
    .valid("draft", "published", "rejected")
    .default("draft"),
     tools: Joi.alternatives()
    .try(Joi.array().items(Joi.number()), Joi.string())
    .custom((value, helpers) => {
      if (Array.isArray(value)) return value;
      try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) return helpers.error("any.invalid");
        return parsed.map(Number);
      } catch {
        return helpers.error("any.invalid");
      }
    })
    .optional()
});

export const updateCourseSchema = Joi.object({
  instructor_id: Joi.number().integer().optional(),
  category_id: Joi.number().integer().optional(),
  subcategory_id: Joi.number().integer().optional(),  
  title: Joi.string().min(3).max(255).optional(),
  description: Joi.string().optional(),
  price: Joi.number().precision(2).min(0).optional(),
  level: Joi.string().valid("beginner", "intermediate", "expert", "all").optional(),
  language: Joi.string().trim().min(2).max(50).required(),
  duration: Joi.string().optional(),
  thumbnail: Joi.string().optional(),
  status: Joi.string().valid("draft", "published", "rejected").optional(),
  tools: Joi.alternatives().try(Joi.array().items(Joi.number()), Joi.string())
  .custom((value, helpers) => {
      if (Array.isArray(value)) return value;
      try {
        const parsed = JSON.parse(value);
        if (!Array.isArray(parsed)) return helpers.error("any.invalid");
        return parsed.map(Number);
      } catch {
        return helpers.error("any.invalid");
      }
    })
    .optional()
});
