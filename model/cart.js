const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  title: { type: String, required: true, unique: true },
  productID: { type: Schema.Types.ObjectId, required: true },
  variantID: { type: Schema.Types.ObjectId, required: true },
  thumbnail: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  quantity: { type: Number, required: true },
  userID: { type: Schema.Types.ObjectId, required: true },
});

const virtual = cartSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.Cart = mongoose.model("Cart", cartSchema);
