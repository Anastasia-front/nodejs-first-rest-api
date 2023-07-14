const isValidId = require("./isValidId");
const {
  validateBody,
  validateFavorite,
  validateAuth,
  validateSubscription,
} = require("./validateBody");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
  isValidId,
  validateBody,
  validateFavorite,
  authenticate,
  validateAuth,
  validateSubscription,
  upload,
};
