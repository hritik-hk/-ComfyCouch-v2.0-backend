const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerReviewSchema = new Schema(
  {
    user_name: { type: String, required: true },
    review: { type: String },
    rating: {
      type: Number,
      min: [1, "rating must be btw 1-5"],
      max: [5, "rating must be btw 1-5"],
      required: true,
    },
  },
  { _id: false }
);

const productSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    colors:  { type: [Schema.Types.Mixed], required:true },
    productDetails: { type: Object, required: true },
    specifications: { type: Object, required: true },
    customerReviews: { type: [customerReviewSchema], required: true },
  },
  { id: false }
);


productSchema.virtual("product_id").get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});


exports.Product = mongoose.model("Product", productSchema);
