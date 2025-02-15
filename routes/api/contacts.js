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
 *   name: Contact
 *   description: Endpoints for managing contacts
 * securityDefinitions:
 *   securitySchemes:
 *     Bearer:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       name: Authorization
 *       in: header
 *       description: Enter your Bearer token here
 */

/**
 * @swagger
 * /api/contact:
 *   get:
 *     summary: Get all contacts
 *     description: Returns an array of all contacts in JSON format with status 200.
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     tags:
 *       - Contact
 *     responses:
 *       200:
 *         description: An array of contacts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetAllContactsResponse'
 *       400:
 *         description: Missing required field(s) / Non-string field(s)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: 'Not Authorized'
 *     security:
 *       - Bearer: []
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
 *     consumes:
 *       - application/json
 *     tags:
 *       - Contact
 *     requestBody:
 *       description: Request body for creating a new contact
 *       content:
 *         'application/json':
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactResponse'
 *       400:
 *         description: Missing required field(s) / Non-string field(s)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: 'Not Authorized'
 *     security:
 *       - Bearer: []
 *
 * /api/contact/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     description: |
 *       Retrieves the contact with the specified ID.
 *       If the ID exists, returns the contact object in JSON format with status 200.
 *       If the ID does not exist, returns JSON with the key "message": "not found" and status 404.
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     tags:
 *       - Contact
 *     parameters:
 *       - name: id
 *         description: ID of the contact to retrieve
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Contact retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactResponse'
 *       404:
 *         description: Contact not found or incorrect path
 *         content:
 *           application/json:
 *             example:
 *               message: 'Not Found'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: 'Not Authorized'
 *     security:
 *       - Bearer: []
 *
 *   delete:
 *     summary: Delete a contact by ID
 *     description: |
 *       Deletes the contact with the specified ID.
 *       If the ID exists, returns JSON with the key "message": "contact deleted" and status 200.
 *       If the ID does not exist, returns JSON with the key "message": "not found" and status 404.
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     tags:
 *       - Contact
 *     parameters:
 *       - name: id
 *         description: ID of the contact to delete
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *         content:
 *           application/json:
 *            example:
 *             message: "Contact Deleted"
 *       404:
 *         description: Contact not found or incorrect path
 *         content:
 *           application/json:
 *             example:
 *              message: "Not Found"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: 'Not Authorized'
 *     security:
 *       - Bearer: []
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
 *     consumes:
 *       - application/json
 *     tags:
 *       - Contact
 *     parameters:
 *       - name: id
 *         description: ID of the contact to update
 *         in: path
 *         required: true
 *         type: string
 *     requestBody:
 *       description: Request body for  updating a contact
 *       content:
 *         'application/json':
 *           schema:
 *             $ref: '#/components/schemas/ContactInput'
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactResponse'
 *       404:
 *         description: Contact not found or incorrect path
 *         content:
 *           application/json:
 *             example:
 *               message: 'Not Found'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: 'Not Authorized'
 *     security:
 *       - Bearer: []
 *
 * /api/contact/{id}/favorite:
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
 *     consumes:
 *       - application/json
 *     tags:
 *       - Contact
 *     parameters:
 *       - name: id
 *         description: ID of the contact to update favorite status
 *         in: path
 *         required: true
 *         type: string
 *     requestBody:
 *       description: Request body for updating the favorite status of a contact
 *       content:
 *         'application/json':
 *           schema:
 *             $ref: '#/components/schemas/UpdateFavoriteInput'
 *     responses:
 *       200:
 *         description: Favorite status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ContactResponse'
 *       400:
 *         description: Missing field favorite / Invalid field type
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Contact not found or incorrect path
 *         content:
 *           application/json:
 *             example:
 *               message: 'Not Found'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: 'Not Authorized'
 *     security:
 *       - Bearer: []
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for the contact.
 *         name:
 *           type: string
 *           description: The name of the contact.
 *         email:
 *           type: string
 *           description: The email of the contact.
 *         number:
 *           type: string
 *           description: The phone number of the contact.
 *         favorite:
 *           type: boolean
 *           description: Indicates whether the contact is marked as a favorite.
 *       required:
 *         - name
 *         - email
 *         - phone
 *
 *     ContactInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the contact
 *           example: 'George'
 *         email:
 *           type: string
 *           description: The email of the contact
 *           example: 'sample@gou.com'
 *         number:
 *           type: string
 *           description: The phone number of the contact
 *           example: '72634582'
 *         favorite:
 *           type: boolean
 *           description: Indicates whether the contact is marked as a favorite.
 *       required:
 *         - name
 *         - email
 *         - phone
 *
 *     ContactResponse:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: 'Lucy'
 *         email:
 *           type: string
 *           example: 'sample@lui.com'
 *         number:
 *           type: string
 *           example: '777665'
 *         favorite:
 *           type: boolean
 *           example: true
 *         owner:
 *           type: string
 *           example: '659d8e83e29b812a4780e23b'
 *         _id:
 *           type: string
 *           example: '659fd43e541fcb6fadafe958'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     OwnerDetails:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: '659fd87d99f63519a9c13270'
 *         email:
 *           type: string
 *           example: 'sample@gou.com'
 *         subscription:
 *           type: string
 *           example: 'pro'
 *
 *     ContactDetails:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: '659fd43e541fcb6fadafe958'
 *         name:
 *           type: string
 *           example: 'George'
 *         email:
 *           type: string
 *           example: 'sample@gou.com'
 *         number:
 *           type: string
 *           example: '123123123'
 *         favorite:
 *           type: boolean
 *           example: false
 *         owner:
 *           $ref: '#/components/schemas/OwnerDetails'
 *
 *     GetAllContactsResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/ContactDetails'
 *
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A message describing the error.
 *
 *     UpdateFavoriteInput:
 *       type: object
 *       properties:
 *         favorite:
 *           type: boolean
 *           description: Indicates whether the contact should be marked as a favorite.
 *       required:
 *         - favorite
 */
