require("dotenv").config();
const JWT = require("jsonwebtoken");
const User = require("../models/user.model");

async function validateToken(req, res, next) {
  const accessToken = req.cookies["access-token-01"];
  if (!accessToken) return res.status(400).json({error: "NOT Authenticated"});
  try {
    const userData = JWT.verify(accessToken, process.env.JWT_SECRET);
    if (userData) {
      const user = await User.findOne({email: userData.email});
      req.user = user; // this is the user object (req.user) that we can use in the next middleware
      next();
    }
  } catch (err) {
    return res.status(500).json({error: "Internal server error"});
  }
}

module.exports = validateToken;
