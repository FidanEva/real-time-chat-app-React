import React, { FormEvent, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { ChatService } from "../services/chatService";
import GifSearch from "./GifSearch";
import useGifHandler from "../hooks/useGifHandler";

const SendMessage: React.FC<{scroll: React.RefObject<HTMLSpanElement | null>}> = ({ scroll }) => {
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const {
    selectedGif,
    isGifSearchVisible,
    handleGifSelect,
    toggleGifSearch,
  } = useGifHandler(user);

  const sendMessage = async (event?: FormEvent) => {
    if (event) event.preventDefault();

    if ((!message.trim() && !selectedGif) || !user) {
      return;
    }

    try {
      if (!selectedGif) {
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
      <button type="button" onClick={toggleGifSearch}>
        {isGifSearchVisible ? "Hide GIFs" : "Show GIFs"}
      </button>
      {isGifSearchVisible && <GifSearch onGifSelect={handleGifSelect} />}
    </form>
  );
};

export default SendMessage;