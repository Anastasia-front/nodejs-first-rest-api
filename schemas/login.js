const Joi = require("joi");
const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const register = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(7).required(),
});

module.exports = register;
