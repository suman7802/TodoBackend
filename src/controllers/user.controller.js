const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const createToken = require("../utils/createToken");

async function checkExistingUser(email) {
  return await User.findOne({email: email});
}

async function httpRegistration(req, res) {
  const {email, password, conformPassword} = req.body;
  const user = await checkExistingUser(email);
  if (user) {
    console.log(`here`);
    return res.status(400).json({message: "User already exists"});
  }
  if (password !== conformPassword)
    return res.status(400).json({message: "Passwords do not match"});

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = new User({email, password: hashedPassword});

  try {
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (error) {
    return res.status(400).json({message: error.message});
  }
}

async function httpLogin(req, res) {
  const {email, password} = req.body;
  try {
    const user = await checkExistingUser(email);

    if (!user) return res.status(404).json({message: "User not found"});

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return res.status(400).json({message: "Invalid credentials"});

    const token = createToken(user);

    return res
      .cookie("access-token-01", token, {
        secure: false,
        Path: "*",
        maxAge: 604800000,
      })
      .status(200)
      .json({message: "Login successful"});
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
}

module.exports = {httpRegistration, httpLogin};
