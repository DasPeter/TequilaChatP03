const { ObjectID, ObjectId } = require("bson");
const Database = require("../models/database.model.js");

class ChannelsController {
	static getAllChannels(req, res) {
		// Get all channel Id's who
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
					res
						.status(500)
						.send({ err: "User " + req.params.channelId + " does not exist" });
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
			"//" +
			req.get("host") +
			"/api/channels/invite/" +
			encodeURI(req.body.name) +
			"-" +
			req.body.userId;

		const channelData = {
			owner: ObjectId(req.body.userId),
			name: req.body.name,
			description: req.body.description,
			inviteUrl: inviteLink,
		};

		// console.log(channelData);

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
