import Joi from "joi";

export const addWishlistSchema = Joi.object({
  course_id: Joi.number().integer().positive().required()
});

export const removeWishlistSchema = Joi.object({
  course_id: Joi.number().integer().positive().required()
});

export const validateAddCourseWishlist = (req, res, next) => {
  const { error } = addWishlistSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  next();
};

export const validateRemoveCourseWishlist = (req, res, next) => {
  const { error } = removeWishlistSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
  next();
};