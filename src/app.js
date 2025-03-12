require("dotenv").config();
require("./config/Database")();
const tryCatch_m = require("./middlewares/try-catch.middleware");
const logger = require("./config/logger");

const express = require("express");
const envJwtKey = require("./utill/envJwtKey");
const app = express();

if (!envJwtKey()) {
  logger.error("FATAL ERROR: jwtsecret is not defined.");
  throw new Error("FATAL ERROR: jwtsecret is not defined.");
}
app.use(express.json());

app.use("/api/users", tryCatch_m(require("./routes/auth-routes")));

// app.use(require("./middlewares/errorHandler"));

// Start the server
module.exports = app;
