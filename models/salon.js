const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const opts = { toJSON: { virtuals: true } };

const SalonSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    average_price: { type: Number, required: true },
    image: { type: String, required: false },
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
  },
  opts
);

SalonSchema.virtual("properties.mapboxClusterHTML").get(function () {
  return `<h3 className="text-2xl text-blue-500 blue underline"><a href='/explore/detail/${this._id}'>${this.name}</a></h3>`;
});

SalonSchema.post("findOneAndDelete", async function (salon) {
  if (salon) {
    await Review.deleteMany({
      _id: {
        $in: salon.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Salon", SalonSchema);
