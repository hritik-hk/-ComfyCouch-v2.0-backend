const mongoose = require("mongoose");
const { Schema } = mongoose;

const variantSchema = new Schema(
  {
    product_id:{ type: Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    color: { type: String, required: true },
    price: {
      type: Number,
      min: [1, "price should be greater than 0"],
      required: true,
    },
    rating: { type: Schema.Types.Decimal128, get: getRating, required: true },
    stock: { type: Number, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true }
  },
  { id: false }
);

function getRating(value) {
    if (typeof value !== "undefined") {
      return parseFloat(value.toString());
    }
    return value;
  }

variantSchema.virtual("variant_id").get(function () {
  return this._id;
});

variantSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  getters: true,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Variant = mongoose.model("Variant", variantSchema);
