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
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Returns an array of all contacts in JSON format with status 200
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 */

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     description: Returns a contact object in JSON format with status 200 if the ID exists; otherwise, returns a JSON with key "message": "not found" and status 404
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID of the contact to retrieve
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A contact object
 *         schema:
 *           $ref: '#/definitions/User'
 *       404:
 *         description: Contact not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: not found
 */
/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Create a new contact
 *     description: Creates a new contact with the provided body in JSON format { name, email, phone } (all fields are required and must be strings).
 *     produces:
 *       - application/json
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
 *     responses:
 *       201:
 *         description: The newly created contact with a unique identifier (id) in JSON format.
 *         schema:
 *           $ref: '#/definitions/User'
 *       400:
 *         description: Missing required field(s) or non-string field(s) in the request body.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: missing required field(s) / non-string field(s)
 */

// Комментарии для маршрута DELETE /api/contacts/:id
/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     description: Deletes a contact with the provided ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID of the contact to delete
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Contact successfully deleted.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: contact deleted
 *       404:
 *         description: Contact not found.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: not found
 */

// Комментарии для маршрута PUT /api/contacts/:id
/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Update a contact by ID
 *     description: Updates the contact with the provided ID with the fields provided in the request body (name, email, and phone). Validation is performed for adding contacts as well.
 *     produces:
 *       - application/json
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
 *     responses:
 *       200:
 *         description: The updated contact in JSON format.
 *         schema:
 *           $ref: '#/definitions/User'
 *       404:
 *         description: Contact not found.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: not found
 */

// Комментарии для маршрута PATCH /api/contacts/:id/favorite
/**
 * @swagger
 * /api/contacts/{id}/favorite:
 *   patch:
 *     summary: Update the "favorite" status of a contact by ID
 *     description: Updates the "favorite" field of the contact with the provided ID with the value provided in the request body (must be a boolean value).
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: ID of the contact to update
 *         in: path
 *         required: true
 *         type: string
 *       - name: body
 *         description: Request body for updating the "favorite" status of a contact
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             favorite:
 *               type: boolean
 *     responses:
 *       200:
 *         description: The updated contact in JSON format.
 *         schema:
 *           $ref: '#/definitions/User'
 *       400:
 *         description: Missing field "favorite" in the request body.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: missing field favorite
 *       404:
 *         description: Contact not found.
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: not found
 */
