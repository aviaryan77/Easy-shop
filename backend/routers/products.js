const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// http://localhost:3000/api/v1/products
// also used as
// app.get(api+"/products", (req, res) => {

router.get(`/`, async (req, res) => {
  const productList = await Product.find();

  if (!productList) {
    res.status(500).json({
      success: false,
    });
  }
  res.send(productList);
});

router.post(`/`, (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });
  product
    .save()
    .then((createdProdut) => {
      res.status(201).json(createdProdut);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

module.exports = router;
