const userModel = require("../model/userModel");

async function findUserByEmail(email) {
  const user = await userModel.findOne({ email });

  return user;
}

module.exports = findUserByEmail;
