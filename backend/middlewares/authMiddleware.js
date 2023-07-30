const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let decodedToken;

  const requestAuth = req.headers.authorization;

  if (requestAuth && requestAuth.startsWith("Bearer")) {
    try {
      const token = requestAuth.split(" ")[1];

      decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

      req.user = await User.findById(decodedToken.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!decodedToken) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
