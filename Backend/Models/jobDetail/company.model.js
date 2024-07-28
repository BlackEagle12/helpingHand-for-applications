const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
	CompanyLinkedInURL: { type: String },
	CompanyLogoUrl: { type: String },
	CompanyName: { type: String },
});

module.exports = mongoose.model("company", companySchema);
