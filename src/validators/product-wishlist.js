import Joi from "joi";

export const addWishlistSchema = Joi.object({
  // user_id: Joi.number().integer().positive().required(),
  product_id: Joi.number().integer().positive().required()
});

export const removeWishlistSchema = Joi.object({
  // user_id: Joi.number().integer().positive().required(),
  product_id: Joi.number().integer().positive().required()
});

export const validateAddProductWishlist = (req, res, next) => {
  const { error } = addWishlistSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  next();
};

export const validateRemoveProductWishlist = (req, res, next) => {
  const { error } = removeWishlistSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  next();
};