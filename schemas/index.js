const addInfo = require("./addInfo");
const updateFavorite = require("./updateFavorite");
const register = require("./register");
const login = require("./login");
const email = require("./email");
const updateSubscription = require("./updateSubscription");

const schema = {
  register,
  login,
  email,
  addInfo,
  updateFavorite,
  updateSubscription,
};

module.exports = schema;
