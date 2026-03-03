import Joi from "joi";

export const signupSchema = Joi.object({
  full_name: Joi.string().required(),
  email: Joi.string().email().required(),
 password: Joi.string()
  .min(8)
  .pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$'))
  .required()
  .messages({
    'string.pattern.base':
      'Password must be at least 8 characters long and include 1 uppercase letter, 1 number, and 1 special character.',
    'string.empty': 'Password is required'
  })
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
 password: Joi.string()
  .min(8)
  .pattern(new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$'))
  .required()
  .messages({
    'string.pattern.base':
      'Password must be at least 8 characters long and include 1 uppercase letter, 1 number, and 1 special character.',
    'string.empty': 'Password is required'
  })
});

// Only phone is required for sending OTP
export const sendOtpSchema = Joi.object({
  phone: Joi.string().required() // E.164 format
});

// For verifying OTP: phone + otp (6 digits)
export const otpVerifySchema = Joi.object({
  phone: Joi.string().required(),
  otp: Joi.string().pattern(/^\d{4,6}$/).required().messages({
    "string.pattern.base": "OTP must be numeric (4 to 6 digits)"
  })
});


export const loginWithTwilioSchema = Joi.object({
  phone: Joi.string().required()
});

export const googleLoginSchema = Joi.object({
  credential: Joi.string().required()
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  new_password: Joi.string().min(6).required(),
  confirm_password: Joi.string().required()
});
