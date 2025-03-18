// @ts-nocheck
const jwt = require("jsonwebtoken");
const BlackList = require("../model/tokenBlackListModel");
const envJwtKey = require("../utill/envJwtKey");

module.exports = async function verifyToken_mw(req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  //check if the token has been blacklisted
  if (await BlackList.findOne({ token })) {
    return res.status(401).send("token has been invalidated, sign in");
  }

  try {
    const verified = jwt.verify(token, envJwtKey());
    if (!verified) {
      return res.status(401).send("expired token");
    }

    const decoded = jwt.decode(token, envJwtKey());
    if (!decoded) {
      return res.status(500).send("invalid token");
    }

    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};
