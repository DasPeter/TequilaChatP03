const { ObjectID, ObjectId } = require("bson");
const Database = require("../models/database.model.js");

class ChannelsController {
	static getAllChannels(req, res) {
		const usersChannelsDb = new Database("usersChannels");

		usersChannelsDb
			.find({ userId: ObjectId(req.body.userId) }, {})
			.toArray()
			.then((results) => {
				if (results.length === 0) {
					res.status(400).send({ msg: "User hasn't joined any channels" });
				} else {
					res.status(200).send({ data: results });
				}
			})
			.catch((err) => {
				res.status(500).send({ err: "Couldn't search user's channels" });
			});
	}

	static getChannelById(req, res) {
		// Return channel data only if token was approved
		const channelsDb = new Database("channels");

		channelsDb
			.findOne({ _id: ObjectID(req.params.channelId) }, {})
			.then((result) => {
				if (result) {
					res.status(200).send({ data: result });
				} else {
					res.status(500).send({
						err: "Channel " + req.params.channelId + " does not exist",
					});
				}
			})
			.catch((err) => {
				res.status(500).send({ err });
			});
	}

	static createChannel(req, res) {
		const channelsDb = new Database("channels");
		const usersChannelsDb = new Database("usersChannels");

		// Prepare channel data

		let inviteLink =
			req.protocol +
			"://" +
			req.get("host") +
			"/api/channels/invite/" +
			encodeURI(req.body.name) +
			"+" +
			req.body.userId;

		const channelData = {
			owner: ObjectId(req.body.userId),
			name: req.body.name,
			description: req.body.description,
			inviteUrl: inviteLink,
		};

		// Insert channel data
		// AND then create userChannel register with owner
		channelsDb
			.insertOne(channelData)
			.then((channelsResult) => {
				// Prepare usersChannels data
				const usersChannelsData = {
					userId: ObjectId(req.body.userId),
					channelId: channelsResult.insertedId,
				};

				// Add user to channel (insert into usersChannels)
				usersChannelsDb
					.insertOne(usersChannelsData)
					.then((usersChannelsResult) => {
						res.send({ status: usersChannelsResult });
					})
					.catch((err) => {
						res.status(500).send({ err: "Couldn't add user to channel" });
					});
			})
			.catch((err) => {
				res.status(500).send({ err: "Couldn't create channel" });
			});
	}

	static joinChannel(req, res) {
		const channelsDb = new Database("channels");
		const usersChannelsDb = new Database("usersChannels");

		let channelSpecifier = req.params.inviteUrl;
		let channelName = decodeURI(channelSpecifier.split("+")[0]);
		let owner = channelSpecifier.split("+")[1];

		// Check if channel exists,
		channelsDb
			.findOne({ name: channelName, owner: ObjectId(owner) }, {})
			.then((channelsResult) => {
				if (channelsResult) {
					// If channel does exist, add user from token to channel (insert into usersChannels db)
					let userToAdd = {
						userId: ObjectId(req.body.userId),
						channelId: ObjectId(channelsResult._id),
					};

					usersChannelsDb
						.insertOne(userToAdd)
						.then((usersChannelsResult) => {
							if (usersChannelsResult) {
								res.status(200).send({ status: usersChannelsResult });
							} else {
								res
									.status(400)
									.send({ status: "Couldn't add user to channel" });
							}
						})
						.catch((err) => {
							res.status(500).send({ err });
						});
				} else {
					res.status(400).send({ msg: "Channel not found" });
				}
			})
			.catch((err) => {
				res.status(500).send({ err });
			});
	}

	// static deleteChannel(req, res) {
	// 	const channelsDb = new Database("channels");
	// 	channelsDb
	// 		.deleteOne({ _id: ObjectID(req.params.userId) })
	// 		.then((result) => {
	// 			res.send({ status: result });
	// 		})
	// 		.catch((err) => {
	// 			res.status(400).send(err);
	// 		});
	// }

	// static updateChannel(req, res) {
	// 	const channelsDb = new Database("channels");
	// 	channelsDb
	// 		.updateOne({ _id: ObjectID(req.params.userId) }, { $set: req.body })
	// 		.then((result) => {
	// 			res.send({ status: result });
	// 		})
	// 		.catch((err) => {
	// 			res.status(400).send(err);
	// 		});
	// }
}

module.exports = ChannelsController;
