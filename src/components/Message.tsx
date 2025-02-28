import React from "react";
import { auth } from "../firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

interface MessageProps {
  message: {
    id: string;
    uid: string;
    avatar: string;
    name: string;
    text: string;
  };
}

const Message: React.FC<MessageProps> = ({ message }) => {
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
