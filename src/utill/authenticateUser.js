const logger = require("../config/logger");
const comparePassword = require("./comparePassword");
const findUser = require("./findUser");
// @ts-ignore
const _ = require("lodash");

async function authenticateUser(body) {
  const user = await findUser(body.email);
  if (!user) {
    logger.error(`User not found for ${body.email}`);
    return null;
  }

  logger.info(`User found for ${body.email}`);
  logger.info("comparing password....");

  const isValidPassword = await comparePassword(body.password, user.password);

  if (!isValidPassword) {
    logger.error(`Invalid password for ${body.email}`);
    return null;
  }

  return _.pick(user, ["_id", "name", "email", "tasks", "createdAt", "profileUrl"]);
}

module.exports = authenticateUser;
