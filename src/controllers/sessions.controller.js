const Database = require("../models/database.model.js");
const jwt = require("jsonwebtoken");
const val = require("../middlewares/validations");

class SessionsController {
	static createSession(req, res) {
		// Using database users
		const usersDb = new Database("users");
		const sessionsDb = new Database("sessions");

		var userData = {
			email: req.body.email,
			password: req.body.password,
		};

		// Check if email exists
		usersDb
			.findOne({ email: req.body.email }, {})
			.then((result) => {
				// If email does exist AND password matches
				if (result && result.password == userData.password) {
					// Generate token
					let newToken = jwt.sign({ userId: result._id }, val.sign);

					// Create session data object
					var sessionData = {
						userId: result._id,
						token: newToken,
					};

					// Save session data object in database
					sessionsDb
						.insertOne(sessionData)
						.then((result) => {
							res.send({ status: result });
						})
						.catch((err) => {
							res.status(400).send(err);
						});
				} else {
					res
						.status(500)
						.send({ err: "User " + req.params.userId + " does not exist" });
				}
			})
			.catch((err) => {
				res.status(500).send({ err });
			});
		// checar que exista correo
		// si sí,
		// objeto mandarlo a guardar a sessions
		// si no
		//  res.status(401).send({msg: "Unauthorized"})
	}
}

module.exports = SessionsController;
