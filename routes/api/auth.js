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
  "/subscription",
  authenticate,
  validateSubscription(schema.updateSubscription),
  ctrlUser.updateSubscription
);

routerAuth.patch(
  "/avatar",
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
 * /api/user/register:
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Email already in use
 *         content:
 *           application/json:
 *             example:
 *               message: 'Email in use'
 *
 * /api/user/login:
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
 *           $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Incorrect email or password or email not verified
 *         content:
 *           application/json:
 *             example:
 *               message: 'Incorrect email or password / Email not verified'
 *
 * /api/user/logout:
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
 *     responses:
 *       200:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             example:
 *               message: 'Logout Successful'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: 'Not Authorized'
 *     security:
 *       - BearerAuth: []
 *
 * /api/user/current:
 *   get:
 *     summary: Get current user
 *     description: |
 *       Retrieves information about the current user.
 *       Requires the Authorization header: "Bearer {{token}}".
 *       - If the user does not exist, returns {"message": "Not authorized"} with status 401.
 *       - Otherwise, returns object with status 200.
 *     produces:
 *       - application/json
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Current user retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CurrentResponse'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               message: 'Not Authorized'
 *     security:
 *       - BearerAuth: []
 *
 * /api/user/verify/{verificationToken}:
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
 *         content:
 *           application/json:
 *             example:
 *               message: Verification Successful'
 *       400:
 *         description: Invalid or expired verification token
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
 *       404:
 *         description: User not found or incorrect path
 *         content:
 *           application/json:
 *             example:
 *               message: 'Not Found'
 *     security:
 *       - BearerAuth: []
 *
 * /api/user/verify:
 *   post:
 *     summary: Resend email verification
 *     description: |
 *       Resend the email verification to the user.
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
 *           $ref: '#/components/schemas/Email'
 *     responses:
 *       200:
 *         description: Verification email sent successfully
 *         content:
 *           application/json:
 *             example:
 *               message: 'Verification email sent'
 *       400:
 *         description: Validation error
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
 *       404:
 *         description: User not found or incorrect path
 *         content:
 *           application/json:
 *             example:
 *               message: 'Not Found'
 *     security:
 *       - BearerAuth: []
 *
 * /api/user/avatar:
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
 *           $ref: '#/components/schemas/Avatar'
 *     responses:
 *       200:
 *         description: Avatar updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AvatarResponse'
 *       400:
 *         description: Avatar upload failed
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
 *       404:
 *         description: User not found or incorrect path
 *         content:
 *           application/json:
 *             example:
 *               message: 'Not Found'
 *     security:
 *       - BearerAuth: []
 * 
 * /api/user/subscription:
 *   patch:
 *     summary: Update user subscription
 *     description: |
 *       Updates the user's subscription.
 *       Requires the Authorization header: "Bearer {{token}}" and a body with subscription field.
 *       - If the user does not exist, returns {"message": "Not authorized"} with status 401.
 *       - If the subscription field is absent, returns {"message":"\"subscription\" is required"} with status 400.
 *       - If the changing is successful, updates the user's subscription and returns { "message": "Avatar updated successfully", "avatarUrl": "updated-avatar-url" } with status 200.
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
 *           $ref: '#/components/schemas/UpdateSubscription'
 *     responses:
 *       200:
 *         description: Avatar updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetails'
 *       400:
 *         description: Subscription is required
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
 *       404:
 *         description: User not found or incorrect path
 *         content:
 *           application/json:
 *             example:
 *               message: 'Not Found'
 *     security:
 *       - BearerAuth: []
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Register:
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
 *     RegisterResponse:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: 'user@example.com'
 *         subscription:
 *           type: string
 *           enum:
 *             - starter
 *             - pro
 *             - business
 *           example: 'starter'
 *
 *     Login:
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
 *       required:
 *         - password
 *         - email
 * 
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWQ4ZTgzZTI5YjgxMmE0NzgwZTIzYiIsImlhdCI6MTcwNTA1Nzg1NSwiZXhwIjoxNzA1MTI5ODU1fQ.JQfF-wwr90tk2MtDVkYSxKC9iaornfDDWhgdv2n3lA4"
 *         user:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               example: "example@mail.com"
 *             subscription:
 *               type: string
 *               example: "business"
 *
 *     UpdateSubscription:
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
 *     Email:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           pattern: '^[^\s@]+@[^\s@]+\.[^\s@]+$'
 *           example: 'user@example.com'
 *
 *     Avatar:
 *       type: object
 *       properties:
 *         avatar:
 *           type: string
 *           format: binary
 *           example: 'base64encodedImage'
 * 
 *     AvatarResponse:
 *       type: object
 *       properties:
 *         avatar:
 *           type: string
 *           format: binary
 *           example: "avatar/659d8e83e29b812a4780e23b_small-image_2024-01-06_14-50-35.png"
 *
 *     UserDetails:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "659d8e83e29b812a4780e23b"
 *         password:
 *           type: string
 *           example: "$2b$10$COMf4mf6654/gvJQ7K1kNuOcKV/XPbNhqqIbuaCgC36u7Ci0zzXZK"
 *         email:
 *           type: string
 *           example: "example@mail.com"
 *         subscription:
 *           type: string
 *           enum:
 *             - starter
 *             - pro
 *             - business
 *           example: "pro"
 *         avatarURL:
 *           type: string
 *           example: "avatar/659d8e83e29b812a4780e23b_small-team.png"
 *         verify:
 *           type: boolean
 *           example: true
 *         verificationToken:
 *           type: string
 *           example: ""
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-09T18:20:51.603Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-12T09:38:33.177Z"
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OWQ4ZTgzZTI5YjgxMmE4NzgwZTIzYiIsImlhdCI6MTcwNTA1MTUwNCwiZXhwIjoxNzA1MTIzNTA0fQ.p_OVz4tl9StcR7R4nuoRO6l-oCt6Oizxpvflh0Xbz6I"
 * 
 *     CurrentResponse:
 *       type: object
 *       properties:
 *         subscription:
 *           type: string
 *           enum:
 *             - starter
 *             - pro
 *             - business
 *           example: 'business'
 *         email:
 *           type: string
 *           example: 'example@mail.com'
 *       required:
 *         - subscription
 *         - email
 * 
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: A message describing the error.
 */
