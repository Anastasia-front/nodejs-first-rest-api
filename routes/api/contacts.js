const express = require("express");

const controllers = require("../../controllers");

const {
  isValidId,
  validateFavorite,
  validateBody,
} = require("../../middlewares");

const schema = require("../../schemas");

const router = express.Router();

router.get("/", controllers.listContacts);

router.get("/:id", isValidId, controllers.getContactById);

router.post("/", validateBody(schema.addSchema), controllers.addContact);

router.put(
  "/:id",
  isValidId,
  validateBody(schema.addSchema),
  controllers.updateContact
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateFavorite(schema.updateFavorite),
  controllers.updateFavorite
);

router.delete("/:id", isValidId, controllers.removeContact);

module.exports = router;
