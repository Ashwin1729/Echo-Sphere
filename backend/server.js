const express = require("express");
const dotenv = require("dotenv");

const connectMongoDB = require("./config/mongoDBConfig");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");

const server = express();
dotenv.config();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("API is running successfuly");
});

server.use("/api/user", userRoutes);
server.use("/api/chat", chatRoutes);
server.use("/api/message", messageRoutes);

server.use(notFound);
server.use(errorHandler);

const port = process.env.PORT || 5000;

connectMongoDB((client) => {
  server.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log(`mongoDB connected: ${client.connection.host}`);
  });
});
