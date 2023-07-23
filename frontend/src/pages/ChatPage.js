import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatPage = () => {
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    const { data } = await axios("/api/chats");

    setChats(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      {chats.map((chat, idx) => (
        <div key={idx}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;
