import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Message as MessageType } from "../types/chat";
import { formatMessageTime } from "../utils/dateUtils";

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
        <p className={`user-name ${user && message.uid === user.uid ? "right" : "left"}`}>
          {message.name}</p>
        {message.type === 'gif' && message.gifUrl ? (
          <img 
            src={message.gifUrl} 
            alt="GIF" 
            style={{ maxWidth: '200px', borderRadius: '8px' }}
          />
        ) : (
          <p className="user-message">{message.text}</p>
        )}
        <span className="message-time">{formatMessageTime(message.createdAt)}</span>
      </div>
    </div>
  );
};

export default Message;