const express = require("express");

const { ctrlUser } = require("../../controllers");

const {
  validateAuth,
  authenticate,
  validateSubscription,
  upload,
} = require("../../middlewares");

const schema = require("../../schemas");

const routerAuth = express.Router();

// signup
routerAuth.post("/register", validateAuth(schema.register), ctrlUser.register);

// signin
routerAuth.post("/login", validateAuth(schema.login), ctrlUser.login);

routerAuth.get("/current", authenticate, ctrlUser.getCurrent);

routerAuth.post("/logout", authenticate, ctrlUser.logout);

routerAuth.patch(
  "/",
  authenticate,
  validateSubscription(schema.updateSubscription),
  ctrlUser.updateSubscription
);

routerAuth.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),

  ctrlUser.updateAvatar
);

module.exports = routerAuth;
