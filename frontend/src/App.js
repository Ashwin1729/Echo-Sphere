import React from "react";
import HomePage from "./pages/HomePage";
import { Route } from "react-router-dom";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div>
      <Route path="/" component={HomePage} exact />
      <Route path="/chats" component={ChatPage} exact />
    </div>
  );
}

export default App;
