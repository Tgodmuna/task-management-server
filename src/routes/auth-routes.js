// @ts-nocheck
const logger = require("../config/logger");
const userRegistration = require("../controllers/registerController");
const envJwtKey = require("../utill/envJwtKey");
const generateToken = require("../utill/genToken");
const validateBody = require("../utill/validateRgeistrationBody");
const router = require("express").Router();

//register route
router.post("/register", async (req, res) => {
  const { email } = req.body;

  logger.info(`User registration request received for ${email}`);

  const error = validateBody(req.body);

  if (error) {
    logger.error(`User registration request validation failed for ${email}`);

    return res.status(400).send({ error, message: "Invalid request body" });
  }

  //if validation is successful, create a new user
  const user = await userRegistration(req.body);

  if (user === "User already exists") {
    return res.status(400).send("User already exists");
  }

  if (!user) {
    return res.status(400).send("User not created");
  }

  res.send({ message: "User created successfully" });
});

router.post("/login", async (req, res) => {
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

  const authenticatedUser = await authenticateUser(req.body);
  if (!authenticatedUser) {
    logger.error(`User authentication failed for ${email}`);
    return res.status(401).send({ message: "Invalid email or password" });
  }

  logger.info("authentication successful");

  //generate token
  token = generateToken(authenticatedUser);
  res
    .header("Authorization", `Bearer ${token}`)
    .status(200)
    .json({ user: authenticatedUser, message: "login successful" });
});

module.exports = router;
