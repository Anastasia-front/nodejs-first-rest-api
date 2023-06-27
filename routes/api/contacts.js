const express = require("express");

const ctrl = require("../../controllers/contacts");

const {
  isValidId,
  validateFavorite,
  validateBody,
} = require("../../middlewares");

const schema = require("../../schemas/contacts");
const { schemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", ctrl.listContacts);

router.get("/:id", isValidId, ctrl.getContactById);

router.post("/", validateBody(schema.addSchema), ctrl.addContact);

router.put(
  "/:id",
  isValidId,
  validateBody(schema.addSchema),
  ctrl.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateFavorite(schemas.updateFavoriteSchema),
  ctrl.updateFavorite
);

router.delete("/:id", isValidId, ctrl.removeContact);

module.exports = router;
