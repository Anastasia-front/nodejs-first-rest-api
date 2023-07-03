const Joi = require("joi");
const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const register = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(7).required(),
  subscription: Joi.string().valid("starter", "pro", "business"),
});

module.exports = register;
