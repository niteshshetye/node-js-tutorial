const { Schema, default: mongoose } = require("mongoose");

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: {
    type: Number,
    required: true,
    min: [0, "Price should greater than 0"],
  },
  discountPercentage: {
    type: Number,
    min: [0, "Rating should greater or equal  0%"],
    max: [50, "Rating should less than or equal 50%"],
  },
  rating: {
    type: Number,
    min: [0, "Rating should greater or equal  0"],
    max: [5, "Rating should less than or equal 5"],
  },
  stock: { type: Number, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: [{ type: String, required: true }],
});

exports.Product = mongoose.model("Product", productSchema);
