import Joi from "joi";

export const registerSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50).required(),

  lastName: Joi.string().trim().allow(""),

  email: Joi.string().email().required(),

  password: Joi.string().min(6).max(30).required(),
});