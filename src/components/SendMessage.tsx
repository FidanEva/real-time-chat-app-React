import React, { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { ChatService } from "../services/chatService";

const SendMessage: React.FC = () => {
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
    } catch (error) {
      console.error("Error sending message:", error);
      // Handle error appropriately (e.g., show toast notification)
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
