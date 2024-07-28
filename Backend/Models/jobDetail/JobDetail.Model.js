const mongoose = require("mongoose");
const Company = require("./company.model");
const Job = require("./job.model");
const Member = require("./member.model");

const jobDetailchema = new mongoose.Schema({
	Company: { type: Company.schema, default: {} },
	Job: { type: Job.schema, required: true },
	isMenberFerched: { type: Boolean, default: false },
	isRefralMessageSent: { type: Boolean, default: false },
	isRefralMessageSent: { type: Boolean, default: false },
	isApplicationSubmitted: { type: Boolean, default: false },
	isIntrested: { type: Boolean, default: false },
	isVisited: { type: Boolean, default: false },
	companymembers: { type: [Member.schema] },
});

module.exports = mongoose.model("JobDetail", jobDetailchema);
