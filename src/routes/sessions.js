const router = require("express").Router();
const sessionsController = require("../controllers/sessions.controller.js");

/**
 * @swagger
 * paths:
 *   /api/login/:
 *     post:
 *       description: Creates a session for a user (logs them in).
 *       tags:
 *         - login
 *       parameters:
 *         - in: body
 *           name: loginData
 *           description: Informartion of the user to be logged in
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *       responses:
 *         200:
 *           description: Success
 *         400:
 *           description: Bad request
 *         500:
 *           description: Server error
 */
router.post("/", sessionsController.createSession);

// router.delete("/:userId", sessionsController.deleteUser);

module.exports = router;
