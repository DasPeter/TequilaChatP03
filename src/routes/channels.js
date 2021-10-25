const router = require("express").Router();
const val = require("../middlewares/validations.js");
const channelsController = require("../controllers/channels.controller.js");

router.get("/", val.validateSession, channelsController.getAllChannels);
router.get("/:channelId", val.validateSession, channelsController.getChannelById); 
router.post("/", val.validateSession, channelsController.createChannel); //listo
// router.patch("/:channelId", channelsController.updateChannel);
// router.delete("/:channelId", channelsController.deleteChannel);

module.exports = router;
