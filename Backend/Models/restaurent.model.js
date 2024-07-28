const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RestaurentSchema = new Schema({
	imageUrl: {
		type: String,
		required: true,
	},
	restaurentName: {
		type: String,
		required: true,
	},
	cusion: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	pramoted: {
		type: Boolean,
		require: true,
	},
	restaurantMenu: [
		{
			itemName: {
				type: String,
				require: true,
			},
			price: {
				type: Number,
				require: true,
			},
		},
	],
});

const Restaurent = mongoose.model("restaurent", RestaurentSchema);
module.exports = Restaurent;
