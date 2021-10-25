const { ObjectID, ObjectId } = require("bson");
const Database = require("../models/database.model.js");

class MessagesController {
	static createMessage(req, res) {
		const messagesDB = new Database("messages");
		const usersChannelsDB = new Database("userChannels");

		let userId = ObjectId(req.body.userId);
		let channelId = ObjectId(req.params.channelId);

		// Find if user is in channel
		usersChannelsDB
			.find(
				{
					userId: ObjectId(req.body.userId),
					channelId: ObjectId(req.params.channelId),
				},
				{}
			)
			.toArray()
			.then((usersChannelResult) => {
				if (usersChannelResult) {
					// If user IS in channel, create message
					let messageData = {
						user: userId,
						channel: channelId,
						message: req.body.message,
						date: new Date(),
					};
					messagesDB.insertOne(messageData).then((result) => {
						res.status(200).send({ status: result });
					});
				} else {
					// If user IS NOT in channel:
					res.status(400).send("Bad request");
				}
			})
			.catch((err) => {
				res.status(500).send({ err });
			});
	}

	static getMessagesByChannel(req, res) {
		const messagesDB = new Database("messages");
		const usersChannelsDB = new Database("usersChannels");

		// Find if user is in channel
		usersChannelsDB
			.findOne(
				{
					userId: ObjectId(req.body.userId),
					channelId: ObjectId(req.params.channelId),
				},
				{}
			)
			.then((usersChannelsResult) => {
				console.log(ObjectId(req.body.userId));
				console.log(ObjectId(req.params.channelId));
				console.log({
					userId: ObjectId(req.body.userId),
					channelId: ObjectId(req.params.channelId),
				});
				if (usersChannelsResult) {
					// If user is found to be in a channel, get messages from channel
					messagesDB
						.find({ channel: ObjectId(req.params.channelId) }, {})
						.toArray()
						.then((messaggesResult) => {
							if (messaggesResult.length === 0) {
								res
									.status(400)
									.send({ msg: "No messages in this channel yet!" });
							} else {
								res.status(200).send({ data: messaggesResult });
							}
						})
						.catch((err) => {
							res.status(500).send({ err });
						});
				} else {
					// If match between user and channel WAS NOT found:
					res
						.status(403)
						.send({ data: "Not allowed to see messages in this channel" });
				}
			})
			.catch((err) => {
				res.status(500).send({ err });
			});
	}
}

module.exports = MessagesController;
