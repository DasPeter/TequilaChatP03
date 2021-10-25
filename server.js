const express = require("express");
const app = express();
const dotenv = require("dotenv");
const config = dotenv.config();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const MongoClient = require("mongodb").MongoClient;
const Database = require("./src/models/database.model.js");

const mainRouter = require("./src/routes");

const PORT = process.env.PORT || 3000;

const swaggerOptions = {
	swaggerDefinition: {
		swagger: "2.0.0",
		info: {
			title: "TequilaChat API",
			description: "API for Tequila Chat. Documented in Swagger",
			version: "1.0.0",
			servers: ["http://localhost:" + PORT],
			contact: {
				name: "Pedro García Romero",
				email: "is722342@iteso.mx",
			},
		},
	},
	apis: [
		"src/routes/users.js",
		"src/routes/sessions.js",
		"src/routes/channels.js",
		"src/routes/messages.js",
	],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", mainRouter);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Connect to the database
MongoClient.connect(
	process.env.DB_URL,
	{ useUnifiedTopology: true },
	function (err, client) {
		if (err) {
			console.log("Failed to connect to MongoDB");
		} else {
			console.log("Succesfully connected to MongoDB");
			database = client.db();
			Database.setDatabase(database);

			app.listen(PORT, () => {
				console.log(
					"Server listening on port:",
					PORT,
					"http://localhost:" + PORT
				);
			});
		}
	}
);
