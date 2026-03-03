import Joi from "joi";

export const createAddressSchema = Joi.object({
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  address_line1: Joi.string().required(),
  address_line2: Joi.string().allow(null, ""),
  city: Joi.string().required(),
  state: Joi.string().required(),
  pincode: Joi.string().pattern(/^[0-9]{6}$/).required(),
  landmark: Joi.string().allow(null, ""),
  address_type: Joi.string().valid("home", "office", "other").default("home"),
  is_default: Joi.number().valid(0, 1).default(0)
});

export const updateAddressSchema = Joi.object({
  full_name: Joi.string().min(2).max(255),
  phone: Joi.string().pattern(/^[0-9]{10}$/),
  address_line1: Joi.string(),
  address_line2: Joi.string().allow(null, ""),
  city: Joi.string(),
  state: Joi.string(),
  pincode: Joi.string().pattern(/^[0-9]{6}$/),
  landmark: Joi.string().allow(null, ""),
  address_type: Joi.string().valid("home", "office", "other"),
  is_default: Joi.number().valid(0, 1)
});
