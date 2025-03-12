const mongoose = require("mongoose");
const logger = require("./logger");

/**
 * Asynchronously connects to the MongoDB database using the appropriate URI based on the environment.
 *
 * The function checks the `NODE_ENV` environment variable to determine whether to use the production
 * or development MongoDB URI. If the URI is not defined in the environment variables, it logs an error
 * and throws an exception.
 *
 * @async
 * @function connectDB
 * @throws {Error} If the MongoDB URI is not defined in the environment variables.
 * @throws {Error} If the connection to MongoDB fails.
 */
const connectDB = async () => {
  let mongoUri;

  try {
    if (process.env.NODE_ENV === "production") {
      mongoUri = process.env.MONGO_URI_PROD;
    } else if (process.env.NODE_ENV === "development") {
      mongoUri = process.env.MONGO_URI_DEV;
    }

    if (!mongoUri) {
      logger.error("MONGO_URI is not defined in the environment variables");

      throw new Error("MONGO_URI is not defined in the environment variables");
    }
    await mongoose.connect(mongoUri, {});
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
