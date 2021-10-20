const router = require("express").Router();
const usersController = require("../controllers/users.controller.js");

router.get("/", usersController.getAllUsers);
router.get("/:userId", usersController.getUserById);
router.post("/", usersController.createUser);

// Project won't have User requests that need x-auth for the moment
// router.patch("/:userId", usersController.updateUser);
// router.delete("/:userId", usersController.deleteUser);

module.exports = router;
