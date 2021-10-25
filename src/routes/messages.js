const router = require("express").Router();
const val = require("../middlewares/validations.js");
const messagesController = require("../controllers/messages.controller.js");

/**
 * @swagger
 * paths:
 *   /api/messages/{channelId}:
 *     get:
 *       description: Get all the messages in a channel. Only returns messages if user specified by bearer token is a member of the channel.
 *       tags:
 *         - messages
 *       parameters:
 *         - in: path
 *           name: channelId
 *           description: The id of the channel whose messages want to be retrieved
 *       responses:
 *         200:
 *           description: Success
 *         403:
 *           description: Forbidden
 *         500:
 *           description: Server error
 */
router.get(
	"/:channelId",
	val.validateSession,
	messagesController.getMessagesByChannel
);

/**
 * @swagger
 * paths:
 *   /api/messages/:
 *     post:
 *       description: Creates a message in the channel specified with the user from the bearer token as author. Can only create a message if user is a member of the channel.
 *       tags:
 *         - messages
 *       parameters:
 *         - in: body
 *           name: messageData
 *           description: Informartion of the message to be created
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *       responses:
 *         200:
 *           description: Success
 *         400:
 *           description: Bad request
 *         500:
 *           description: Server error
 */
router.post(
	"/:channelId",
	val.validateSession,
	messagesController.createMessage
);

module.exports = router;
