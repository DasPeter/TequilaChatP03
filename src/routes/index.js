const indexRouter = require("express").Router();

const usersRoutes = require("./users");
const sessionsRoutes = require("./sessions");
const channelsRoutes = require("./channels");
const messagesRoutes = require("./messages");

indexRouter.use("/users", usersRoutes);
indexRouter.use("/login", sessionsRoutes);
indexRouter.use("/channels", channelsRoutes);
indexRouter.use("/messages", messagesRoutes);

module.exports = indexRouter;
