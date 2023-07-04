const express = require("express");

const { cntrlUser } = require("../../controllers");

const {
  validateAuth,
  authenticate,
  validateSubscription,
} = require("../../middlewares");

const schema = require("../../schemas");

const routerAuth = express.Router();

// signup
routerAuth.post("/register", validateAuth(schema.register), cntrlUser.register);

// signin
routerAuth.post("/login", validateAuth(schema.login), cntrlUser.login);

routerAuth.get("/current", authenticate, cntrlUser.getCurrent);

routerAuth.post("/logout", authenticate, cntrlUser.logout);

routerAuth.patch(
  "/",
  authenticate,
  validateSubscription(schema.updateSubscription),
  cntrlUser.updateSubscription
);

module.exports = routerAuth;
