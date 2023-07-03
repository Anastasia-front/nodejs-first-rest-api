const express = require("express");

const { cntrlContacts } = require("../../controllers");

const {
  isValidId,
  validateFavorite,
  validateBody,
  authenticate,
} = require("../../middlewares");

const schema = require("../../schemas");

const routerContacts = express.Router();

routerContacts.get("/", authenticate, cntrlContacts.listContacts);

routerContacts.get(
  "/:id",
  authenticate,
  isValidId,
  cntrlContacts.getContactById
);

routerContacts.post(
  "/",
  authenticate,
  validateBody(schema.addSchema),
  cntrlContacts.addContact
);

routerContacts.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schema.addSchema),
  cntrlContacts.updateContact
);

routerContacts.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateFavorite(schema.updateFavorite),
  cntrlContacts.updateFavorite
);

routerContacts.delete("/:id", isValidId, cntrlContacts.removeContact);

module.exports = routerContacts;
