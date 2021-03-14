const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const EventSchema = new Schema({
	date: String,
	time: String,
	title: String,
	geometry: {
		type: {
			type: String,
			enum: ["Point"],
			required: false,
		},
		coordinates: {
			type: [Number],
			required: false,
		},
	},
	type: String,
	price: Number,
	images: { url: String, filename: String },
	location: String,
	description: String,
	author: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	comments: [
		{
			type: Schema.Types.ObjectId,
			ref: "Comment",
		},
	],
});
EventSchema.virtual("properties.popUpMarkup").get(function () {
	return `
    <strong><a href="/events/${this._id}">${this.title}</a><strong>
    <p>${this.description.substring(0, 20)}...</p>`;
});
module.exports = mongoose.model("Event", EventSchema);
