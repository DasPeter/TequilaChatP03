const router = require("express").Router();
const Database = require("../models/database.model.js");
// const { ObjectID } = require("bson");
const jwt = require("jsonwebtoken");
const sign = "martes pero a que costo";

// Session validator middleware
function validateSession(req, res, next) {
	const sessionsDb = new Database("sessions");

	// First read the token in request header
	// Authorization: "Bearer abcxyz123"
	token = req.get("Authorization").split(" ")[1];
	if (token) {
		// CHECK IF TOKEN IS VALID FIRST
		jwt.verify(token, sign, (err, deciphered) => {
			if (err) {
				// If token isn't valid, error
				res.status(400).send({ error: "Invalid token" });
			} else {
				// If it is valid, THEN CHECK wether token exists in database's sessions
				// console.log(deciphered.userId);
				// console.log(token);
				sessionsDb
					.findOne({ token: token }, {})
					.then((sessionsResult) => {
						if (sessionsResult) {
							req.body.userId = sessionsResult.userId; // If it did exist, save UserId in req
							// console.log(req.body);
							next(); // and continue to next()
						} else {
							// If session didn't exist, return error
							res.status(400).send({ err: "Invalid session" });
						}
					})
					.catch((err) => {
						res.status(500).send({ err: "a" });
					});
			}
		});
	} else {
		res.status(400).send({ error: "Invalid or missing token" });
	}

	// If it exists, next()
	// If it doesn't, ... res.status(401).send({msg: "Unauthorized"})
}

module.exports = { sign, validateSession };
