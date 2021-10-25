const { ObjectID, ObjectId } = require("bson");
const Database = require("../models/database.model.js");

class MessagesController {
	static createMessage(req, res) {
		const messagesDB = new Database("messages");
		const userChannelsDB = new Database("userChannels");

		let userId = ObjectId(req.body.userId);
		let channelId = ObjectId(req.params.channelId);

		// Find if user is in channel
		userChannelsDB
			.find(
				{
					idUser: ObjectId(req.body.userId),
					idChannel: ObjectId(req.params.channelId),
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

		console.log(req.body.userId);
		console.log(req.params.channelId);
		// Find if user is in channel
		usersChannelsDB
			.findOne(
				{
					idUser: ObjectId(req.body.userId),
					idChannel: ObjectId(req.params.channelId),
				},
				{}
			)
			.then((result) => {
				if (result) {
					// If match between user and channel WASN'T found:
					res
						.status(403)
						.send({ data: "Not allowed to see messages in this channel" });
				} else {
					// If match between user and channel WAS found:
					messagesDB
						.find({ channel: ObjectId(req.params.channelId) }, {})
						.toArray()
						.then((results) => {
							if (results.length === 0) {
								res
									.status(400)
									.send({ msg: "No messages in this channel yet!" });
							} else {
								res.status(200).send({ data: results });
							}
						})
						.catch((err) => {
							res.status(500).send({ err });
						});
				}
			})
			.catch((err) => {
				res.status(500).send({ err });
			});
	}
}

module.exports = MessagesController;
