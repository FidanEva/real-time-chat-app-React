import React, { FormEvent, useState, RefObject } from "react";
import { useAuth } from "../hooks/useAuth";
import { ChatService } from "../services/chatService";

interface SendMessageProps {
  scroll: RefObject<HTMLSpanElement | null>;
}

const SendMessage: React.FC<SendMessageProps> = ({ scroll }) => {
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  const sendMessage = async (event: FormEvent) => {
    event.preventDefault();
    
    if (!message.trim() || !user) {
      return;
    }

    try {
      await ChatService.sendMessage({
        text: message.trim(),
        name: user.displayName,
        avatar: user.photoURL,
        uid: user.uid,
      });
      setMessage("");
      if (scroll.current) {
        scroll.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <form className="send-message" onSubmit={(event) => sendMessage(event)}>
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;