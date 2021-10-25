const router = require("express").Router();
const val = require("../middlewares/validations.js");
const channelsController = require("../controllers/channels.controller.js");

/**
 * @swagger
 * paths:
 *   /api/channels:
 *     get:
 *       description: Get all channels. Only returns channels of the user specified by bearer token.
 *       tags:
 *         - channels
 *       responses:
 *         200:
 *           description: Success
 *         500:
 *           description: Server error
 */
router.get("/", val.validateSession, channelsController.getAllChannels);

/**
 * @swagger
 * paths:
 *   /api/channels/{channelId}:
 *     get:
 *       description: Get a user by ID.
 *       tags:
 *         - channels
 *       parameters:
 *         - in: path
 *           name: channelId
 *           description: The id of the channel wanted
 *       responses:
 *         200:
 *           description: Success
 *         500:
 *           description: Server error
 */
router.get(
	"/:channelId",
	val.validateSession,
	channelsController.getChannelById
);

/**
 * @swagger
 * paths:
 *   /api/channels/:
 *     post:
 *       description: Creates a channel
 *       tags:
 *         - channels
 *       parameters:
 *         - in: body
 *           name: channelData
 *           description: Informartion of the channel to be created
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *       responses:
 *         200:
 *           description: Success
 *         400:
 *           description: Bad request
 *         500:
 *           description: Server error
 */
router.post("/", val.validateSession, channelsController.createChannel);

/**
 * @swagger
 * paths:
 *   /api/channels/invite/{inviteUrl}:
 *     post:
 *       description: Joins the user specified by bearer token to the channel associated to the URL.
 *       tags:
 *         - channels
 *       parameters:
 *         - in: path
 *           name: inviteUrl
 *           description: The associated channel URL invite code
 *       responses:
 *         200:
 *           description: Success
 *         400:
 *           description: Bad request
 *         500:
 *           description: Server error
 */
router.post(
	"/invite/:inviteUrl",
	val.validateSession,
	channelsController.joinChannel
);

// router.patch("/:channelId", channelsController.updateChannel);
// router.delete("/:channelId", channelsController.deleteChannel);

module.exports = router;
