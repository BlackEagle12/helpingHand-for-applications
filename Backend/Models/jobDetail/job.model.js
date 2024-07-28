const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
	LinkedInPostUrl: { type: String, required: true },
	JobTitle: { type: String, required: true },
	Location: { type: String },
	PostTime: { type: String },
	TotalApplicant: { type: String },
	JobRemotType: { type: String },
	JobType: { type: String },
	IsEasyApply: { type: Boolean, required: true },
});

module.exports = mongoose.model("Job", jobSchema);
