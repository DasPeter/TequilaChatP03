const router = require("express").Router();
const sign = "martes pero a que costo";

// Session validator middleware
function validateSession(req, res, next) {
	// First read the token in request header
	// "Authorization: Bearer abcxyz123"
	token = req.get("Authorization").split(" ")[1];

	// Check wether token exists in database's sessions
	// If it exists, next()
	// If it doesn't, ... res.status(401).send({msg: "Unauthorized"})
}

module.exports = { sign, validateSession };
