const express = require("express");
const chats = require("./data/data");

const server = express();

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

server.listen(5000, () => {
  console.log("Server started on port 5000");
});
