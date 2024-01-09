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
  validateBody(schema.addInfo),
  ctrlContacts.addContact
);

routerContacts.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schema.addInfo),
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

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Endpoints for managing contacts  
 * securityDefinitions:
 *   BearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *     description: Enter your Bearer token here
 */

/**
 * @swagger
 *
 * /api/contacts:
 *   get:
 *     summary: Get all contacts
 *     description: |
 *       Returns an array of all contacts in JSON format with status 200.
 *     produces:
 *       - application/json
 *     tags:
 *       - Contacts
 *     responses:
 *       200:
 *         description: An array of contacts
 *       401:
 *         description: Unauthorized
 *     security:
 *       - BearerAuth: []
 *
 *   post:
 *     summary: Create a new contact
 *     description: |
 *       Creates a new contact.
 *       Receives body in the format {name, email, phone} (all fields are mandatory and must be strings).
 *       - If any required fields are missing or non-string fields are present, returns {"message": "missing required field(s) / non-string field(s)"} with status 400.
 *       - If successful, adds a unique identifier to the contact object and returns the object with the added id {id, name, email, phone} with status 201.
 *     produces:
 *       - application/json
 *     tags:
 *       - Contacts
 *     parameters:
 *       - name: body
 *         description: Request body for creating a new contact
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *           required:
 *             - name
 *             - email
 *             - phone
 *     responses:
 *       201:
 *         description: Contact created successfully
 *       400:
 *         description: Missing required field(s) / Non-string field(s)
 *       401:
 *         description: Unauthorized
 *     security:
 *       - BearerAuth: []
 *
 * /api/contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     description: |
 *       Retrieves the contact with the specified ID.
 *       If the ID exists, returns the contact object in JSON format with status 200.
 *       If the ID does not exist, returns JSON with the key "message": "not found" and status 404.
 *     produces:
 *       - application/json
 *     tags:
 *       - Contacts
 *     parameters:
 *       - name: id
 *         description: ID of the contact to retrieve
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Contact retrieved successfully
 *       404:
 *         description: Contact not found
 *       401:
 *         description: Unauthorized
 *     security:
 *       - BearerAuth: []
 *
 *   delete:
 *     summary: Delete a contact by ID
 *     description: |
 *       Deletes the contact with the specified ID.
 *       If the ID exists, returns JSON with the key "message": "contact deleted" and status 200.
 *       If the ID does not exist, returns JSON with the key "message": "not found" and status 404.
 *     produces:
 *       - application/json
 *     tags:
 *       - Contacts
 *     parameters:
 *       - name: id
 *         description: ID of the contact to delete
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *       404:
 *         description: Contact not found
 *       401:
 *         description: Unauthorized
 *     security:
 *       - BearerAuth: []
 *
 *   put:
 *     summary: Update a contact by ID
 *     description: |
 *       Updates the contact with the specified ID.
 *       Receives body in JSON format with updates to any of the fields (validation present as in contact creation).
 *       If successful, returns the updated contact object with status 200.
 *       If the ID does not exist, returns JSON with the key "message": "not found" and status 404.
 *     produces:
 *       - application/json
 *     tags:
 *       - Contacts
 *     parameters:
 *       - name: id
 *         description: ID of the contact to update
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: Request body for updating a contact
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             phone:
 *               type: string
 *           required:
 *             - name
 *             - email
 *             - phone
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *       404:
 *         description: Contact not found
 *       401:
 *         description: Unauthorized
 *     security:
 *       - BearerAuth: []
 *
 * /api/contacts/{id}/favorite:
 *   patch:
 *     summary: Update the favorite status of a contact by ID
 *     description: |
 *       Updates the favorite status of the contact with the specified ID.
 *       Receives body in JSON format with updates to the favorite field (must be a boolean).
 *       If successful, returns the updated contact object with status 200.
 *       If the ID does not exist, returns JSON with the key "message": "not found" and status 404.
 *       If the required field is missing or is not a boolean, returns JSON with the key "message":"missing field favorite" and status 400.
 *     produces:
 *       - application/json
 *     tags:
 *       - Contacts
 *     parameters:
 *       - name: id
 *         description: ID of the contact to update favorite status
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: Request body for updating the favorite status of a contact
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             favorite:
 *               type: boolean
 *           required:
 *             - favorite
 *     responses:
 *       200:
 *         description: Favorite status updated successfully
 *       400:
 *         description: Missing field favorite / Invalid field type
 *       404:
 *         description: Contact not found
 *       401:
 *         description: Unauthorized
 *     security:
 *       - BearerAuth: []
 */
