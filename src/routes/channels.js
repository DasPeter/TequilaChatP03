const router = require("express").Router();
const channelsController = require("../controllers/channels.controller.js");

router.get("/", channelsController.getAllChannels);
router.get("/:channelId", channelsController.getChannelById);
router.post("/", channelsController.createChannel);
// router.patch("/:channelId", channelsController.updateChannel);
// router.delete("/:channelId", channelsController.deleteChannel);

module.exports = router;
