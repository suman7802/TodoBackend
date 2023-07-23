require("dotenv").config();
const JWT = require("jsonwebtoken");

function createToken(user) {
  const accessToken = JWT.sign({email: user.email}, process.env.JWT_SECRET);
  return accessToken;
}

module.exports = createToken;
