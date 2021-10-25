const router = require("express").Router();
const val = require("../middlewares/validations.js");
const messagesController = require("../controllers/messages.controller.js");

router.post(
	"/:channelId", val.validateSession, messagesController.createMessage
);

router.get(
	"/:channelId", val.validateSession, messagesController.getMessagesByChannel
);

module.exports = router;
