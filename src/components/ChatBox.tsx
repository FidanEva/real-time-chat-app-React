import React, { useEffect, useRef, useState } from "react";
import { ChatService } from "../services";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { Message as MessageType } from "../types/chat";
import UserSearch from "./UserSearch";
import ChatRoomList from "./ChatRoomList";
import { useTranslation } from "react-i18next";

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const scroll = useRef<HTMLSpanElement | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!selectedRoomId) return;

    try {
      const unSubscribe = ChatService.subscribeToMessages(selectedRoomId, (newMessages) => {
        setMessages(newMessages);
        setError(null);
      });
      return () => unSubscribe();
    } catch (err: any) {
      console.error('Error subscribing to messages:', err);
      if (err?.code === 'failed-precondition') {
        setError(t('chat.indexBuilding'));
      } else {
        setError(t('chat.errorLoadingMessages'));
      }
    }
  }, [selectedRoomId, t]);

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleChatStart = (roomId: string) => {
    setSelectedRoomId(roomId);
    setError(null);
  };

  return (
    <div className="chat-container">
      <aside className="chat-sidebar">
        <UserSearch onChatStart={handleChatStart} />
        <ChatRoomList onRoomSelect={handleChatStart} selectedRoomId={selectedRoomId} />
      </aside>
      
      <main className="chat-box">
        {selectedRoomId ? (
          <>
            <div className="messages-wrapper">
              {error && <div className="error-message">{error}</div>}
              {messages?.map((message) => (
                <Message key={message.id} message={message} />
              ))}
              <span ref={scroll}></span>
            </div>
            <div className="input-area">
              <SendMessage scroll={scroll} roomId={selectedRoomId} />
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <h2>{t('chatRoom.selectChat')}</h2>
            <p>{t('chatRoom.startNewChat')}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatBox;