import React, { useEffect, useRef, useState } from "react";
import { ChatService } from "../services/chatService";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { Message as MessageType } from "../types/chat";


const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const scroll = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const unSubscribe = ChatService.subscribeToMessages(setMessages);
    return () => unSubscribe();
  }, []);

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <span ref={scroll}></span>
      <div className="input-area">
        <SendMessage scroll={scroll} />
      </div>
    </main>
  );
};

export default ChatBox;