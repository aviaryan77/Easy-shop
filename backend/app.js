const express = require("express");
const app = express();
const mongoose = require("mongoose"); //  for MongoDB
// mongoose.set("useFindAndModify", false);

const cors = require("cors");
const bodyParser = require("body-parser"); //   for middleware try in postman
const morgan = require("morgan"); // checking the method in log
const errorHandler = require("./helpers/error-handler");
const authJwt = require("./helpers/jwt");
require("dotenv/config");

app.use(cors());
app.options("*", cors());

//middlewere
app.use(bodyParser.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);

//Routes
const categoriesRoutes = require("./routes/categories");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");
const ordersRoutes = require("./routes/orders");

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

// Database
mongoose
  .connect(
    process.env.CONNECTION_STRING,
    // "mongodb+srv://avi:test123@cluster0.i8b1u.mongodb.net/Twigo-shopee?retryWrites=true&w=majority",
    {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "Twigo-shopee",
      useFindAndModify: false,
    },
  )
  .then(() => {
    console.log("Database connection is ready...");
  })
  .catch((err) => {
    console.log("database error");
  });

// Server

app.listen(3000, () => {
  console.log("server is  running on http localhost 3000");
  console.log(api);
});
