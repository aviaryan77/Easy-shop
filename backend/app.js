const express = require("express");
const app = express();

require("dotenv/config");
const api = process.env.API_URL;
const bodyParser = require("body-parser");

//  middleware

app.use(bodyParser.json());

// http://localhost:3000/api/v1/products
// also used as
// app.get(api+"/products", (req, res) => {

app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    name: "hairdresser",
    image: "some_URL",
  };
  res.send(product);
});

app.post(`${api}/products`, (req, res) => {
  const newProduct = req.body;
  console.log(newProduct);
  res.send(newProduct);
});

app.listen(3000, () => {
  console.log("server is  running on http 3000");
  console.log(api);
});
