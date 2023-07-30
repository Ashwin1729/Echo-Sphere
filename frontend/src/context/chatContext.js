import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
  const history = useHistory();
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) {
      history.push("/");
    }
  }, [history]);

  const store = {
    user,
    setUser,
    selectedChat,
    setSelectedChat,
    chats,
    setChats,
  };

  return <ChatContext.Provider value={store}>{children}</ChatContext.Provider>;
};

export default ChatContextProvider;
