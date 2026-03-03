import Joi from "joi";

/* ================== HOTELS ================== */

export const createHotelSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  address: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  country: Joi.string().required()
});

export const updateHotelSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  address: Joi.string().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  country: Joi.string().optional(),
  is_active: Joi.number().valid(0, 1).optional()
});

export const toggleHotelStatusSchema = Joi.object({
  is_active: Joi.number().valid(0, 1).required()
});

/* ================== ROOMS ================== */

export const createRoomSchema = Joi.object({
  total_rooms: Joi.number().integer().min(1).default(1),
  hotel_id: Joi.number().integer().required(),
  room_type: Joi.string().required(),
  max_guests: Joi.number().integer().min(1).required(),
  price_per_night: Joi.number().positive().required(),
  per_person_fees: Joi.number().optional(),
  cleaning_charge: Joi.number().optional(),
  gst: Joi.number().optional(),
  discount: Joi.number().optional(),
  status: Joi.string().valid("active", "inactive").optional(),
  amenities: Joi.alternatives().try(
    Joi.array().items(Joi.number()),
    Joi.string()
  ).required()
});

export const updateRoomSchema = Joi.object({
  hotel_id: Joi.number().integer().required(),
  room_type: Joi.string().optional(),
  max_guests: Joi.number().integer().min(1).optional(),
  price_per_night: Joi.number().positive().optional(),
  per_person_fees: Joi.number().min(0).optional(),
  cleaning_charge: Joi.number().min(0).optional(),
  gst: Joi.number().min(0).optional(),
  discount: Joi.number().min(0).optional(),
  status: Joi.string().valid("active", "inactive").optional(),
  amenities: Joi.alternatives().try(
    Joi.array().items(Joi.number()),
    Joi.string()
  ).required()
});

export const createAmenitiesSchema = Joi.object({
  name: Joi.string().required(),
})

export const updateAmenitiesSchema = Joi.object({
  name: Joi.string().required(),
})


export const createRoomAvailabilitySchema = Joi.object({
  room_id: Joi.number().integer().required(),
  is_available: Joi.boolean().required(),
  date: Joi.date().iso().required()
});


export const updateRoomAvailabilitySchema = Joi.object({
  is_available: Joi.boolean().required()
});


