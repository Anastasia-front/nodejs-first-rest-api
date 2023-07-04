const addSchema = require("./addInfo");
const updateFavorite = require("./updateFavorite");
const register = require("./register");
const login = require("./login");
const updateSubscription = require("./updateSubscription");

const schema = {
  addSchema,
  updateFavorite,
  register,
  login,
  updateSubscription,
};

module.exports = schema;
