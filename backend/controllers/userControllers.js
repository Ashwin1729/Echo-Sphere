const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const generateJWT = require("../config/generateJwt");
const bcrypt = require("bcryptjs");

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

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    name,
    email,
    password: hashedPassword,
    pic,
  });

  const result = await user.save();

  const data = result._doc;

  if (result) {
    res.status(201).json({
      _id: data._id,
      name: data.name,
      email: data.email,
      pic: data.pic,
      token: generateJWT(data._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create a user");
  }
});

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const matchedPassword = await bcrypt.compare(password, user.password);

  if (user && matchedPassword) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateJWT(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
};

const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          {
            name: { $regex: req.query.search, $options: "i" },
            _id: { $ne: req.user._id.toString() },
          },
          {
            email: { $regex: req.query.search, $options: "i" },
            _id: { $ne: req.user._id.toString() },
          },
        ],
      }
    : {};

  const users = await User.find(keyword);

  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
