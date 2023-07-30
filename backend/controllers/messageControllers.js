const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const Chat = require("../models/chatModel");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  try {
    const newMessage = new Message({
      sender: req.user._id.toString(),
      content: content,
      chat: chatId,
    });

    let response = await newMessage.save();
    response = await response.populate("sender", "name pic");
    response = await response.populate("chat");
    response = await response.populate({
      path: "chat.users",
      select: "name pic email",
    });

    const data = response._doc;
    console.log(data);

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: data,
    });

    res.json(data);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");

    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage, allMessages };
