const express = require("express");
const dotenv = require("dotenv");
const { Server } = require("socket.io");

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
  const backendServer = server.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log(`mongoDB connected: ${client.connection.host}`);

    const io = new Server(backendServer, {
      pingTimeout: 60000,
      cors: {
        origin: "http://localhost:3000",
      },
    });

    io.on("connection", (socket) => {
      console.log("Connected to Socket.io");
      socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
      });

      socket.on("joinChat", (roomId) => {
        socket.join(roomId);
      });

      socket.on("typing", (room) => socket.in(room).emit("typing"));
      socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

      socket.on("new message", (newMessageRecieved) => {
        const chat = newMessageRecieved.chat;

        if (!chat.users) return console.log("chat.users is not defined");

        chat.users.forEach((user) => {
          if (user._id === newMessageRecieved.sender._id) {
            return;
          }

          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
      });

      socket.off("setup", () => {
        console.log("User Disconnected");
        socket.leave(userData._id);
      });
    });
  });
});
