const router = require("express").Router();
const sessionsController = require("../controllers/sessions.controller.js");

router.post("/", sessionsController.createSession);

// Project won't have session requests that need x-auth for the moment
// router.delete("/:userId", sessionsController.deleteUser);

module.exports = router;
