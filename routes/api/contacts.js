const express = require("express");

const { ctrlContacts } = require("../../controllers");

const {
  isValidId,
  validateFavorite,
  validateBody,
  authenticate,
} = require("../../middlewares");

const schema = require("../../schemas");

const routerContacts = express.Router();

routerContacts.get("/", authenticate, ctrlContacts.listContacts);

routerContacts.get(
  "/:id",
  authenticate,
  isValidId,
  ctrlContacts.getContactById
);

routerContacts.post(
  "/",
  authenticate,
  validateBody(schema.addSchema),
  ctrlContacts.addContact
);

routerContacts.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schema.addSchema),
  ctrlContacts.updateContact
);

routerContacts.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateFavorite(schema.updateFavorite),
  ctrlContacts.updateFavorite
);

routerContacts.delete("/:id", isValidId, ctrlContacts.removeContact);

module.exports = routerContacts;
