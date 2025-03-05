import React, { FormEvent, useState, useEffect, RefObject } from "react";
import { useAuth } from "../hooks/useAuth";
import { ChatService } from "../services/chatService";
import { Gif } from "../types/giph";

interface SendMessageProps {
  scroll: RefObject<HTMLSpanElement | null>;
  selectedGif: Gif | null;
  onGifSent: () => void;
}

const SendMessage: React.FC<SendMessageProps> = ({ scroll, selectedGif, onGifSent }) => {
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  const sendMessage = async (event?: FormEvent) => {
    if (event) event.preventDefault();
    
    if ((!message.trim() && !selectedGif) || !user) {
      return;
    }

    try {
      if (selectedGif) {
        await ChatService.sendMessage({
          type: 'gif',
          gifUrl: selectedGif.images.fixed_height.url,
          name: user.displayName,
          avatar: user.photoURL,
          uid: user.uid,
        });
        onGifSent();
      } else {
        await ChatService.sendMessage({
          type: 'text',
          text: message.trim(),
          name: user.displayName,
          avatar: user.photoURL,
          uid: user.uid,
        });
      }
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (selectedGif) {
      sendMessage();
    }
  }, [selectedGif]);

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