const express = require("express");
const dotenv = require("dotenv");
const chats = require("./data/data");

const server = express();
dotenv.config();

server.get("/", (req, res) => {
  res.send("API is running successfuly");
});

server.get("/api/chats", (req, res) => {
  res.send(chats);
});

server.get("/api/chats/:id", (req, res) => {
  const chatId = req.params.id;
  const chatData = chats.filter((chat) => chat._id === chatId);
  res.send(chatData);
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
