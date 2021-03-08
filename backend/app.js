const express = require("express");
const app = express();
const mongoose = require("mongoose"); //  for MongoDB

require("dotenv/config");
const api = process.env.API_URL;
const bodyParser = require("body-parser"); //   for middleware try in postman
const morgan = require("morgan"); // checking the method in log
const productsRouter = require("./routers/products");

//middlewere
app.use(bodyParser.json());
app.use(morgan("tiny"));

// Routers
app.use(`${api}/products`, productsRouter);

// Database
mongoose
  .connect(
    process.env.CONNECTION_STRING,
    // "mongodb+srv://avi:test123@cluster0.i8b1u.mongodb.net/Twigo-shopee?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "Twigo-shopee",
    },
  )
  .then(() => {
    console.log("Database connection is ready");
  })
  .catch((err) => {
    console.log("database error");
  });

// Server

app.listen(3000, () => {
  console.log("server is  running on http 3000");
  console.log(api);
});
