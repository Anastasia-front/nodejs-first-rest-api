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

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authorization endpoints
 * components:
 *  securitySchemes:
 *    BearerAuth:
 *      type: apiKey
 *      name: Authorization
 *      in: header
 *      description: Enter your Bearer token here
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: User registration
 *     description: |
 *       Registers a new user.
 *       Receives body in the format {email, password}.
 *       - Email and password are mandatory strings with validation.
 *       - If email is already in use, returns {"message": "Email in use"} with status 409.
 *       - If validation fails, returns "Validation error from Joi or other validation library" with status 400.
 *       - If registration is successful, returns { "user": { "email": "example@example.com" } } with status 201.
 *     produces:
 *       - application/json
 *     tags:
 *       - Auth
 *     parameters:
 *       - name: body
 *         description: Request body for user registration
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/RegisterSchema'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already in use
 *
 * /api/users/login:
 *   post:
 *     summary: User login
 *     description: |
 *       Logs in a user.
 *       Receives body in the format {email, password}.
 *       - Email and password are mandatory strings with validation.
 *       - If validation fails, returns "Validation error from Joi or other validation library" with status 400.
 *       - If email or password is incorrect, returns {"message": "Email or password is wrong"} with status 401.
 *       - If login is successful, generates a token, stores it in the user's current field, and returns { "token": "exampletoken", "user": { "email": "example@example.com" } } with status 200.
 *     produces:
 *       - application/json
 *     tags:
 *       - Auth
 *     parameters:
 *       - name: body
 *         description: Request body for user login
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/LoginSchema'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Incorrect email or password
 *
 * /api/users/logout:
 *   post:
 *     summary: User logout
 *     description: |
 *       Logs out a user.
 *       Receives empty body with the mandatory header Authorization: "Bearer {{token}}".
 *       - If the user with the _id does not exist in the "user" model, returns {"message": "Not authorized"} with status 401.
 *       - Otherwise, deletes the token in the current user and returns status 204.
 *     produces:
 *       - application/json
 *     tags:
 *       - Auth
 *     parameters:
 *       - name: body
 *         description: Request body for user logout
 *         in: body
 *         required: true
 *     responses:
 *       204:
 *         description: User logged out successfully
 *       401:
 *         description: Not authorized
 *     security:
 *       - BearerAuth: []
 *
 * /api/users/current:
 *   get:
 *     summary: Get current user
 *     description: |
 *       Retrieves information about the current user.
 *       Requires the Authorization header: "Bearer {{token}}".
 *       - If the user does not exist, returns {"message": "Not authorized"} with status 401.
 *       - Otherwise, returns { "email": "example@example.com" } with status 200.
 *     produces:
 *       - application/json
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Current user retrieved successfully
 *       401:
 *         description: Not authorized
 *     security:
 *       - BearerAuth: []
 *
 * /api/users/verify/{verificationToken}:
 *   get:
 *     summary: Verify user email
 *     description: |
 *       Verifies the user's email using the provided verification token.
 *       - If the token is valid, marks the user's email as verified and returns { "message": "Email verified successfully" } with status 200.
 *       - If the token is invalid or expired, returns { "message": "Invalid or expired verification token" } with status 400.
 *     produces:
 *       - application/json
 *     tags:
 *       - Auth
 *     parameters:
 *       - name: verificationToken
 *         description: User's email verification token
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid or expired verification token
 *     security:
 *       - BearerAuth: []
 *
 * /api/users/verify:
 *   post:
 *     summary: Resend email verification
 *     description: |
 *       Resends the email verification to the user.
 *       Receives body in the format {email}.
 *       - Email is a mandatory string with validation.
 *       - If the email is not found in the system, returns { "message": "Email not found" } with status 404.
 *       - If the email is already verified, returns { "message": "Email already verified" } with status 400.
 *       - If the email is valid and not verified, sends a new verification email and returns { "message": "Verification email sent successfully" } with status 200.
 *     produces:
 *       - application/json
 *     tags:
 *       - Auth
 *     parameters:
 *       - name: body
 *         description: Request body for resending email verification
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/EmailSchema'
 *     responses:
 *       200:
 *         description: Verification email sent successfully
 *       400:
 *         description: Email already verified / Validation error
 *       404:
 *         description: Email not found
 *     security:
 *       - BearerAuth: []
 *
 * /api/users/avatars:
 *   patch:
 *     summary: Update user avatar
 *     description: |
 *       Updates the user's avatar.
 *       Requires the Authorization header: "Bearer {{token}}" and a form-data body with a single "avatar" field containing the image file.
 *       - If the user does not exist, returns {"message": "Not authorized"} with status 401.
 *       - If the image upload fails, returns {"message": "Avatar upload failed"} with status 400.
 *       - If the upload is successful, updates the user's avatar URL and returns { "message": "Avatar updated successfully", "avatarUrl": "updated-avatar-url" } with status 200.
 *     produces:
 *       - application/json
 *     tags:
 *       - Auth
 *     parameters:
 *       - name: body
 *         description: Request body for updating user avatar
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/AvatarSchema'
 *     responses:
 *       200:
 *         description: Avatar updated successfully
 *       400:
 *         description: Not authorized / Avatar upload failed
 *     security:
 *       - BearerAuth: []
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterSchema:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           pattern: '^[^\s@]+@[^\s@]+\.[^\s@]+$'
 *           example: 'user@example.com'
 *         password:
 *           type: string
 *           min: 7
 *           example: 'strongPassword'
 *         subscription:
 *           type: string
 *           enum:
 *             - starter
 *             - pro
 *             - business
 *           example: 'pro'
 *       required:
 *         - password
 *         - email
 *
 *     LoginSchema:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           pattern: '^[^\s@]+@[^\s@]+\.[^\s@]+$'
 *           example: 'user@example.com'
 *         password:
 *           type: string
 *           min: 7
 *           example: 'userPassword'
 *         required:
 *           - password
 *           - email
 *
 *     UpdateSubscriptionSchema:
 *       type: object
 *       properties:
 *         subscription:
 *           type: string
 *           enum:
 *             - starter
 *             - pro
 *             - business
 *           example: 'pro'
 *
 *     EmailSchema:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           pattern: '^[^\s@]+@[^\s@]+\.[^\s@]+$'
 *           example: 'user@example.com'
 *
 *     AvatarSchema:
 *       type: object
 *       properties:
 *         avatar:
 *           type: string
 *           format: binary
 *           example: 'base64encodedImage'
 */
