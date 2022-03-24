const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const SalonSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  average_price: { type: Number, required: true },
  images: [{ type: Image, required: false }],
  street_address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip_code: { type: String, required: true },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
});

module.exports = mongoose.model("Salon", SalonSchema);
