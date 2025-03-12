const JWT = require("jsonwebtoken");
const envJwtKey = require("./envJwtKey");

function generateToken(user) {
  return JWT.sign({ email: user.email, id: user._id }, envJwtKey(), {
    expiresIn: "24h",
  });
}

module.exports = generateToken;
