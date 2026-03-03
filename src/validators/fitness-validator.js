import Joi from "joi";

/* ================= CREATE WORKOUT ================= */
export const createWorkoutSchema = Joi.object({
    title: Joi.string().min(3).max(150).required(),
    level: Joi.string()
        .valid("beginner", "intermediate", "advanced")
        .required(),
    duration: Joi.number().integer().min(5).max(300).required(),
    calories: Joi.number().integer().min(10).max(3000).required(),
    exercises: Joi.string().required().custom((value, helpers) => {
        try {
            const parsed = JSON.parse(value);
            if (!Array.isArray(parsed)) {
                return helpers.error("any.invalid");
            }
            for (const ex of parsed) {
                if (
                    !ex.title ||
                    !ex.muscle ||
                    !ex.sets ||
                    !ex.reps ||
                    !ex.rest_seconds
                ) {
                    return helpers.error("any.invalid");
                }
            }
            return value;
        } catch (err) {
            return helpers.error("any.invalid");
        }
    }, "Exercises JSON validation")
});


/* ================= UPDATE WORKOUT ================= */
export const updateWorkoutSchema = Joi.object({
    title: Joi.string().min(3).max(150).optional(),
    level: Joi.string()
        .valid("beginner", "intermediate", "advanced")
        .optional(),
    duration: Joi.number().integer().min(5).max(300).optional(),
    calories: Joi.number().integer().min(10).max(3000).optional(),
    exercises: Joi.string().optional().custom((value, helpers) => {
        try {
            const parsed = JSON.parse(value);

            if (!Array.isArray(parsed)) {
                return helpers.error("any.invalid");
            }
            for (const ex of parsed) {
                if (
                    !ex.title ||
                    !ex.muscle ||
                    !ex.sets ||
                    !ex.reps ||
                    !ex.rest_seconds
                ) {
                    return helpers.error("any.invalid");
                }
            }
            return value;
        } catch (err) {
            return helpers.error("any.invalid");
        }
    }, "Exercises JSON validation")
});

/* ================= CREATE WORKOUT LOG================= */
export const createWorkoutLogSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    workout_id: Joi.number().integer().required(),
    calories_burned: Joi.number().integer().min(1).required(),
    log_date: Joi.date().required()
});

/* ================= UPDATE WORKOUT LOG================= */
export const updateWorkoutLogSchema = Joi.object({
    user_id: Joi.number().integer().required(),
    workout_id: Joi.number().integer().optional(),
    calories_burned: Joi.number().integer().min(1).optional(),
    log_date: Joi.date().optional()
});

/* ================= CREATE DIET PLAN SCHEMA================= */
export const createDietPlanSchema = Joi.object({
  title: Joi.string().required(),
  total_calories: Joi.number().required(),
  diet_type: Joi.string().required()
});

/* ================= UPDATE DIET PLAN SCHEMA================= */
export const updateDietPlanSchema = Joi.object({
  title: Joi.string().optional(),
  total_calories: Joi.number().optional(),
  diet_type: Joi.string().optional()
});

/* ================= CREATE DIET PLAN SCHEMA================= */
export const createDietMealSchema = Joi.object({
  diet_id: Joi.number().required(),
  meal_type: Joi.string().valid("breakfast", "lunch", "dinner", "snack").required(),
  title: Joi.string().required(),
  calories: Joi.number().required(),
  carbs: Joi.number().required(),
  protein: Joi.number().required(),
  fat: Joi.number().required(),
});

/* ================= UPDATE DIET MEAL SCHEMA================= */
export const updateDietMealSchema = Joi.object({
  meal_type: Joi.string().optional(),
  title: Joi.string().optional(),
  calories: Joi.number().optional(),
  carbs: Joi.number().optional(),
  protein: Joi.number().optional(),
  fat: Joi.number().optional(),
});

/* ================= CREATE WATER LOG SCHEMA================= */
export const createWaterIntakeSchema = Joi.object({
  user_id: Joi.number().required(),
  amount_ml: Joi.number().min(1).required(),
  log_date: Joi.date().required()
});

/* ================= UPDATE WATER LOG SCHEMA================= */
export const updateWaterIntakeSchema = Joi.object({
  amount_ml: Joi.number().min(1).optional(),
  log_date: Joi.date().optional()
});

/* ================= CREATE FITNESS PROFILE SCHEMA================= */
export const createFitnessProfileSchema = Joi.object({
  user_id: Joi.number().required(),
  height: Joi.string().optional(),
  weight: Joi.number().optional(),
  activity_level: Joi.string()
    .valid("sedentary", "light", "moderate", "active")
    .optional(),
  target_weight: Joi.number().optional(),
  workout_days: Joi.number().integer().optional(),
  primary_goal: Joi.string().optional(),
  workout_duration: Joi.number().integer().optional(),
  diet_type: Joi.string().optional(),
  meals_per_day: Joi.number().integer().optional(),
  water_goal: Joi.number().integer().optional()
});

/* ================= UPDATE FITNESS PROFILE SCHEMA================= */
export const updateFitnessProfileSchema = Joi.object({
  height: Joi.string().optional(),
  weight: Joi.number().optional(),
  activity_level: Joi.string()
    .valid("sedentary", "light", "moderate", "active")
    .optional(),
  target_weight: Joi.number().optional(),
  workout_days: Joi.number().integer().optional(),
  primary_goal: Joi.string().optional(),
  workout_duration: Joi.number().integer().optional(),
  diet_type: Joi.string().optional(),
  meals_per_day: Joi.number().integer().optional(),
  water_goal: Joi.number().integer().optional()
});