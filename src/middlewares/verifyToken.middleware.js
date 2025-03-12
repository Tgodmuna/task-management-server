const jwt = require("jsonwebtoken");
const logger = require("../config/logger");
const envJwtKey = require("../utill/envJwtKey");

/**
 * Middleware to verify the JWT token from the request header.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * 
 * @returns {void}
 * 
 * @throws {Error} If the token is invalid or expired.
 */
function verifyToken(req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    logger.error("Access Denied");
    return res.status(401).send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, envJwtKey());
    req.user = verified;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      logger.error("Token has expired");
      return res.status(401).send("Token has expired");
    } else if (error.name === "JsonWebTokenError") {
      logger.error("Invalid Token");
      return res.status(400).send("Invalid Token");
    } else {
      logger.error(error);
      return res.status(400).send("Invalid Token");
    }
  }
}

module.exports = verifyToken;
