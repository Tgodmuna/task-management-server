// @ts-nocheck
const logger = require("../config/logger");
const userRegistration = require("../controllers/registerController");
const tryCatchMiddleware = require("../middlewares/try-catch.middleware");
const TokenBlacklist = require("../model/tokenBlackListModel");
const authenticateUser = require("../utill/authenticateUser");
const envJwtKey = require("../utill/envJwtKey");
const generateToken = require("../utill/genToken");
const validateLoginBody = require("../utill/validateLoginBody");
const validateBody = require("../utill/validateRgeistrationBody");
const router = require("express").Router();

//register route
router.post(
  "/register",
  tryCatchMiddleware(async (req, res) => {
    const { email } = req.body;

    logger.info(`User registration request received for ${email}`);

    const error = validateBody(req.body);

    if (error) {
      logger.error(`User registration request validation failed for ${email}`);
      return res.status(400).send({ error, message: "Invalid request body" });
    }
    logger.info("validation successful");

    //if validation is successful, create a new user
    const user = await userRegistration(req.body);

    if (user === "User already exists") {
      return res.status(400).send("User already exists");
    }

    if (!user) {
      return res.status(400).send("User not created");
    }

    return res.send({ message: "User created successfully" });
  })
);

//login route
router.post(
  "/login",
  tryCatchMiddleware(async (req, res) => {
    console.log("body recieved:", req.body);
    const { email, password } = req.body;

    logger.info(`User login request received for ${email}`);
    logger.info("validating login request body.......");

    const error = validateLoginBody(req.body);

    if (error === "Email and password are required") {
      logger.error(`User login request validation failed for ${email}`);
      return res.status(400).send({ message: "Email and password are required'" });
    } else if (error === "Email and password must be strings") {
      logger.error(`User login request validation failed for ${email}`);
      return res.status(400).send({ error, message: "Email and password must be strings" });
    } else if (error) {
      logger.error(`User login request validation failed for ${email}`);
      return res.status(400).send({ error, message: "Invalid request body" });
    }

    logger.info("login request body validation successful");
    logger.info("authenticating user.......");
    console.log(req.body);
    const authenticatedUser = await authenticateUser(req.body);
    if (!authenticatedUser) {
      logger.error(`User authentication failed for ${email}`);
      return res.status(401).send({ message: "Invalid email or password" });
    }

    logger.info("authentication successful");

    //generate token
    token = generateToken(authenticatedUser);
    res.status(200).json({ user: authenticatedUser, message: "login successful", token });
    logger.info(`${authenticatedUser.email} has logged-in and session started`);
    return;
  })
);

//logout route
router.post("/logout", async (req, res) => {
  const token = req.header("x-auth-token");

  if (!token) {
    logger.error("Logout request failed: No token provided");
    return res.status(400).send({ message: "No token provided" });
  }

  // Invalidate the token (implementation depends on your token management strategy)
  // For example, you could add the token to a blacklist

  await new TokenBlacklist({ token }).save();
  logger.info("token has been blacklisted");

  logger.info("User logged out successfully");
  res.status(200).send({ message: "Logout successful" });
});
module.exports = router;
