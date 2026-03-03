import Joi from "joi";

export const workoutIdParamSchema = Joi.object({
  id: Joi.number().required()
});

export const workoutLevelParamSchema = Joi.object({
  level: Joi.string()
    .valid("beginner", "intermediate", "advanced")
    .required()
});

export const workoutFilterSchema = Joi.object({
  title: Joi.string().optional(),
  level: Joi.string()
    .valid("beginner", "intermediate", "advanced")
    .optional(),
  min_duration: Joi.number().optional(),
  max_duration: Joi.number().optional(),
  min_calories: Joi.number().optional(),
  max_calories: Joi.number().optional()
});

export const dietIdParamSchema = Joi.object({
  id: Joi.number().required()
});

export const mealFilterSchema = Joi.object({
  meal_type: Joi.string()
    .valid("breakfast", "lunch", "dinner", "snack")
    .optional(),
  min_calories: Joi.number().optional(),
  max_calories: Joi.number().optional(),
  diet_id: Joi.number().optional()
});

export const createWaterIntakeSchema = Joi.object({
  user_id: Joi.number().required(),
  amount_ml: Joi.number().min(1).required(),
  log_date: Joi.date().required()
});

export const updateWaterIntakeSchema = Joi.object({
  amount_ml: Joi.number().min(1).optional(),
  log_date: Joi.date().optional()
});

export const dateRangeSchema = Joi.object({
  start_date: Joi.date().required(),
  end_date: Joi.date().required()
});

export const getDailyIntakeSchema = Joi.object({
  date: Joi.date().required()
})

export const createWorkoutLogSchema = Joi.object({
  user_id: Joi.number().required(),
  workout_id: Joi.number().required(),
  calories_burned: Joi.number().required(),
  log_date: Joi.date().required()
});

export const updateWorkoutLogSchema = Joi.object({
  user_id: Joi.number().required(),
  workout_id: Joi.number().optional(),
  calories_burned: Joi.number().optional(),
  log_date: Joi.date().optional()
});

export const deleteWorkoutLogSchema = Joi.object({
  user_id: Joi.number().required()
});

export const getMyWorkoutLogsSchema = Joi.object({
  user_id: Joi.number().required()
});

export const getWorkoutLogByIdSchema = Joi.object({
  user_id: Joi.number().required()
});

export const dailyWorkoutSummarySchema = Joi.object({
  user_id: Joi.number().required(),
  date: Joi.date().required()
});


export const createProfileSchema = Joi.object({
  height: Joi.string().required(),
  weight: Joi.number().required(),
  activity_level: Joi.string()
    .valid("sedentary", "light", "moderate", "active")
    .required(),
  target_weight: Joi.number().optional(),
  workout_days: Joi.number().optional(),
  primary_goal: Joi.string().optional(),
  workout_duration: Joi.number().optional(),
  diet_type: Joi.string().optional(),
  meals_per_day: Joi.number().optional(),
  water_goal: Joi.number().optional()
});

export const updateProfileSchema = Joi.object({
  height: Joi.string().optional(),
  weight: Joi.number().optional(),
  activity_level: Joi.string()
    .valid("sedentary", "light", "moderate", "active")
    .optional(),
  target_weight: Joi.number().optional(),
  workout_days: Joi.number().optional(),
  primary_goal: Joi.string().optional(),
  workout_duration: Joi.number().optional(),
  diet_type: Joi.string().optional(),
  meals_per_day: Joi.number().optional(),
  water_goal: Joi.number().optional()
});