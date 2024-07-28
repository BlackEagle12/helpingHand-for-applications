const express = require("express");
const mongoose = require("mongoose");

var cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

mongoose
	.connect("mongodb+srv://emailsender.sy9pplp.mongodb.net/", {
		dbName: "LinkedIn_ScrapedData",
		user: "vicky",
		pass: "emailsendeR",
	})
	.then(() => {
		console.log("DB Connected");
	});

const homeRouter = require("./Routes/home.route");
const restaurentRouter = require("./Routes/restaurent.route");
const jobDetailRouter = require("./Routes/jobData.route");

app.use("/restaurent", restaurentRouter);
app.use("/jobDetails", jobDetailRouter);
app.use("/", homeRouter);

app.use((req, res, next) => {
	const error = new Error("NOT FOUND");
	error.status = 404;
	next(error);
});

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.send({
		error: {
			status: err.status || 500,
			message: err.message || "Internal servar error",
		},
	});
});

app.listen(3000, () => {
	console.log("Server started");
});
