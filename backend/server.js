const express = require("express");
const dotenv = require("dotenv");

const connectMongoDB = require("./config/mongoDBConfig");
const userRoutes = require("./routes/userRoutes");

const server = express();
dotenv.config();

server.get("/", (req, res) => {
  res.send("API is running successfuly");
});

server.use("/api/user", userRoutes);

const port = process.env.PORT || 5000;

connectMongoDB((client) => {
  server.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log(`mongoDB connected: ${client.connection.host}`);
  });
});
