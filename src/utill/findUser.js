const userModel = require("../model/userModel");

async function findUser(body) {
  const user = await userModel.findOne({ email: body.email });

  return user;
}

module.exports = findUser;
