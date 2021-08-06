// Initialize
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");

// Logger
app.use(morgan("combined"));

// Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
const router = require("./app/router/routes");
app.use(router);

// Error handler
const HttpError = require("./app/models/http-error");
app.use((req, res, next) => {
  return next(new HttpError("Could not find this route", 401));
});

// DB
const uri = process.env.DB.toString();
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error(error);
  }
};
connectDB();

// Listener
const listener = app.listen(process.env.PORT || 5000, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});

module.exports = listener;
