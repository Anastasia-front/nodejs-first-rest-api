const Joi = require("joi");

const addInfo = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  number: Joi.string().required(),
  favorite: Joi.boolean(),
});

module.exports = addInfo;
