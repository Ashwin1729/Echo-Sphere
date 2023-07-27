import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";
import { ChatContext } from "../context/chatContext";
import SideBar from "../components/passive_components/SideBar";
import ChatsList from "../components/ChatsList";
import ChatBox from "../components/ChatBox";

const ChatPage = () => {
  const chatCtx = useContext(ChatContext);
  const user = chatCtx.user;

  return (
    <div style={{ width: "100%" }}>
      {user && <SideBar />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="90vh"
        p="10px"
      >
        {user && <ChatsList />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;
