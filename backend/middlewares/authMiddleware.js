const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  const requestAuth = req.headers.authorization;

  if (requestAuth && requestAuth.startsWith("Bearer")) {
    try {
      token = requestAuth.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

      console.log(decodedToken);

      req.user = await User.findById(decodedToken.id).select("-password");

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
