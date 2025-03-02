import React from "react";
import { auth } from "../firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Message as MessageType } from "../types/chat";

const Message: React.FC<{ message: MessageType }> = ({ message }) => {
  const [user] = useAuthState(auth);

  return (
    <div className={`chat-bubble ${user && message.uid === user.uid ? "right" : ""}`}>
      <img
        className="chat-bubble__left"
        src={message.avatar}
        alt="user avatar"
      />
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
      </div>
    </div>
  );
};

export default Message;