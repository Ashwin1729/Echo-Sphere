const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the required fields");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = new User({
    name,
    email,
    password,
    pic,
  });

  const result = await user.save();

  if (result) {
    res.status(201).json(user);
  } else {
    res.status(400);
    throw new Error("Failed to create a user");
  }
});

module.exports = { registerUser };
