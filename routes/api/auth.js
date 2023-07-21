const express = require("express");

const { ctrlUser } = require("../../controllers");

const {
  validateAuth,
  authenticate,
  validateSubscription,
  validateEmail,
  upload,
} = require("../../middlewares");

const schema = require("../../schemas");

const routerAuth = express.Router();

routerAuth.post("/register", validateAuth(schema.register), ctrlUser.register);

routerAuth.get("/verify/:verificationToken", ctrlUser.verifyEmail);

routerAuth.post(
  "/verify",
  validateEmail(schema.email),
  ctrlUser.resendVerifyEmail
);

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
