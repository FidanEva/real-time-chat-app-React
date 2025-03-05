import React, { useEffect, useRef, useState } from "react";
import { ChatService } from "../services/chatService";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { Message as MessageType } from "../types/chat";
import GifSearch from "./GifSearch";
import { Gif } from "../types/giph";

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [selectedGif, setSelectedGif] = useState<Gif | null>(null);
  const [isGifSearchVisible, setIsGifSearchVisible] = useState(false);
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

  const handleGifSelect = (gif: Gif) => {
    setSelectedGif(gif);
    setIsGifSearchVisible(false);
  };

  const handleGifSent = () => {
    setSelectedGif(null);
  };

  const toggleGifSearch = () => {
    setIsGifSearchVisible(!isGifSearchVisible);
  };

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <span ref={scroll}></span>
      <div className="input-area">
        <button onClick={toggleGifSearch} style={{ marginBottom: "100px" }}>
          {isGifSearchVisible ? "Hide GIFs" : "Show GIFs"}
        </button>
        <SendMessage 
          scroll={scroll} 
          selectedGif={selectedGif}
          onGifSent={handleGifSent}
        />
      </div>
      {isGifSearchVisible && <GifSearch onGifSelect={handleGifSelect} />}
    </main>
  );
};

export default ChatBox;