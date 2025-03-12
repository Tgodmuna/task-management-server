const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const envJwtKey = require("../utill/envJwtKey");
const logger = require("../config/logger");

const userRegistration = async (body) => {
  const { name, email, password } = body;

  //check for existing user
  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    logger.error("User already exists");
    return "User already exists";
  }

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const CreatedUser = await userModel.create({ name, email, hashedPassword });

  await CreatedUser.save();

  if (!CreatedUser) {
    logger.error("User not created");
    return null;
  }

  return CreatedUser;
};

module.exports = userRegistration;
