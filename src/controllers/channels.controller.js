const { ObjectID } = require("bson");
const Database = require("../models/database.model.js");

class ChannelsController {
	static getAllChannels(req, res) {
		const channelsDb = new Database("channels");
		channelsDb
			.find({}, {})
			.toArray()
			.then((results) => {
				if (results.length === 0) {
					res.status(400).send({ msg: "No channels found!" });
				} else {
					res.status(200).send({ data: results });
				}
			})
			.catch((err) => {
				res.status(500).send({ err });
			});
	}

	static getChannelById(req, res) {
		const channelsDb = new Database("channels");
		channelsDb
			.findOne({ _id: ObjectID(req.params.userId) }, {})
			.then((result) => {
				if (result) {
					res.status(200).send({ data: result });
				} else {
					res
						.status(500)
						.send({ err: "User " + req.params.userId + " does not exist" });
				}
			})
			.catch((err) => {
				res.status(500).send({ err });
			});
	}

	static createChannel(req, res) {
		const channelsDb = new Database("channels");
		const userData = req.body;
		channelsDb
			.insertOne(userData)
			.then((result) => {
				res.send({ status: result });
			})
			.catch((err) => {
				res.status(400).send(err);
			});
	}

	static deleteChannel(req, res) {
		const channelsDb = new Database("channels");
		channelsDb
			.deleteOne({ _id: ObjectID(req.params.userId) })
			.then((result) => {
				res.send({ status: result });
			})
			.catch((err) => {
				res.status(400).send(err);
			});
	}

	static updateChannel(req, res) {
		const channelsDb = new Database("channels");
		channelsDb
			.updateOne({ _id: ObjectID(req.params.userId) }, { $set: req.body })
			.then((result) => {
				res.send({ status: result });
			})
			.catch((err) => {
				res.status(400).send(err);
			});
	}
}

module.exports = ChannelsController;
