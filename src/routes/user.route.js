const express = require("express");
const userRoute = express.Router();

const {httpRegistration, httpLogin} = require("../controllers/user.controller");

userRoute.post("/registration", httpRegistration);
userRoute.post("/login", httpLogin);

module.exports = userRoute;
