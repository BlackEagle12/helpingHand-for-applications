const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
	memberName: { type: String, required: true },
	memberProfileUrl: { type: String, required: true },
	memberPosition: { type: String },
	IsInvitationSent: { type: Boolean, default: false },
	successMessage: { type: String },
});

module.exports = mongoose.model("Member", memberSchema);
