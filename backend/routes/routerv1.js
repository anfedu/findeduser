const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const { auth, authAdmin } = require("../middleware/auth");
const {
  register,
  login,
  readUsers,
  readUser,
  deleteUser,
  updateUser,
} = require("../controller/user");

// <-- authentication routes -->
/**
 * @swagger
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name.
 *           example: Nuril Firdaus
 *         email:
 *           type: string
 *           description: The user's email.
 *           example: nuril@gmail.com
 *         password:
 *           type: string
 *           description: The user's password.
 *           example: iajsd98387
 *     User:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The user ID.
 *               example: 0
 *         - $ref: '#/components/schemas/Register'
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: register user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 */
router.post("/register", register);

/**
 * @swagger
 * components:
 *   schemas:
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The user's email.
 *           example: nuril@gmail.com
 *         password:
 *           type: string
 *           description: The user's password.
 *           example: iajsd98387
 *     User:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The user ID.
 *               example: 0
 *         - $ref: '#/components/schemas/Login'
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: login user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 */
router.post("/login", login);

// <-- user routes -->
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of  users.
 *     description: Retrieve a list of users from . Can be used to populate a list of fake users when prototyping or testing an API.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
router.get("/users", readUsers);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Retrieve a single user.
 *     description: Retrieve a single user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 */
router.get("/user/:id", readUser);

router.patch("/user/:id", fileUpload(), updateUser);
router.delete("/user/:id", deleteUser);

module.exports = router;
