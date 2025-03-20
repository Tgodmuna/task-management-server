require("dotenv").config();
require("./config/Database")();
const tryCatch_m = require("./middlewares/try-catch.middleware");
const logger = require("./config/logger");

const express = require("express");
const envJwtKey = require("./utill/envJwtKey");
const tokenValidityMiddleWare = require("./middlewares/verifyTokenMiddleWare");
const PermissionMiddleWare = require("./middlewares/authorisation.middleWare");
const Error_mw = require("./middlewares/errorMiddleware");
const app = express();
const cors = require("cors");
app.use(express.json());

try {
  if (!envJwtKey()) {
    logger.error("FATAL ERROR: jwtsecret is not defined.");
    throw new Error("FATAL ERROR: jwtsecret is not defined.");
  }
} catch (err) {
  logger.error(err.message);
  console.log(err.message);
}
app.use(
  cors({
    origin: `${
      process.env.NODE_ENV === "development"
        ? process.env.DEV_allowedOrigin
        : process.env.PROD_allowedOrigin
    }`,
  })
);
app.use("/api/auth", require("./routes/auth-routes"));
app.use(
  "/api/task",
  tokenValidityMiddleWare,
  PermissionMiddleWare,
  require("./routes/task-routes")
);
app.use(
  "/api/user",
  tokenValidityMiddleWare,
  PermissionMiddleWare,
  require("./routes/user-routes")
);
app.use(Error_mw);

// Start the server
module.exports = app;
