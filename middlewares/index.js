const isValidId = require("./isValidId");
const {
  validateBody,
  validateFavorite,
  validateAuth,
  validateSubscription,
  validateEmail,
} = require("./validateBody");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
  isValidId,
  validateBody,
  validateFavorite,
  authenticate,
  validateAuth,
  validateEmail,
  validateSubscription,
  upload,
};
