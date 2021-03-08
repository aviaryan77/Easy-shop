const mongoose = require("mongoose"); //  for MongoDB

const productSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: Number,
});

exports.Product = mongoose.model("Product", productSchema);
