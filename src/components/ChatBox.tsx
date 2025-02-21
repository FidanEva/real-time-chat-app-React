import React from "react";
import Message from "./Message";
import SendMessage from "./SendMessage";

type ChatBoxProps = {
  messages: { avatarSrc: string; userName: string; message: string }[];
};

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages.map((msg, index) => (
          <Message key={index} avatarSrc={msg.avatarSrc} userName={msg.userName} message={msg.message} />
        ))}
      </div>
      <SendMessage />
    </main>
  );
};

export default ChatBox;
