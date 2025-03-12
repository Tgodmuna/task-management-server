const logger = require("../config/logger");
const comparePassword = require("./comparePassword");
const findUser = require("./findUser");

async function authenticateUser(body) {
  const user = await findUser(body);
  if (!user) {
    logger.error(`User not found for ${body.email}`);
    return null;
  }

  logger.info(`User found for ${body.email}`);
  logger.info("comparing password....");

  const isValidPassword = await comparePassword(user.password, body.password);

  if (!isValidPassword) {
    logger.error(`Invalid password for ${body.email}`);
    return null;
  }
    
    return user;
}

module.exports = authenticateUser;
