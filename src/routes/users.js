const router = require("express").Router();
const usersController = require("../controllers/users.controller.js");

/**
 * @swagger
 * paths:
 *   /api/users:
 *     get:
 *       description: Get all registered users
 *       tags:
 *         - users
 *       responses:
 *         200:
 *           description: Success
 *         500:
 *           description: Server error
 */
router.get("/", usersController.getAllUsers);

/**
 * @swagger
 * paths:
 *   /api/users/{userId}:
 *     get:
 *       description: Get a user by ID
 *       tags:
 *         - users
 *       parameters:
 *         - in: path
 *           name: userId
 *           description: The id of the user wanted
 *       responses:
 *         200:
 *           description: success response
 *         500:
 *           description: error from server
 */
router.get("/:userId", usersController.getUserById);

/**
 * @swagger
 * paths:
 *   /api/users/:
 *     post:
 *       description: Register a new user
 *       tags:
 *         - users
 *       parameters:
 *         - in: body
 *           name: user
 *           description: The user to be registered
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - username
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               username:
 *                 type: string
 *       responses:
 *         200:
 *           description: Success
 *         400:
 *           description: Bad request
 *         500:
 *           description: Server error
 */
router.post("/", usersController.createUser);

// Unused
// router.patch("/:userId", usersController.updateUser);
// router.delete("/:userId", usersController.deleteUser);

module.exports = router;
