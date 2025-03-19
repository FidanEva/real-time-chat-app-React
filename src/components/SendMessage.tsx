import React, { FormEvent, useState, useRef } from "react";
import { useAuth, useGifHandler } from "../hooks";
import { ChatService } from "../services";
import GifSearch from "./GifSearch";
import { useTranslation } from "react-i18next";

interface SendMessageProps {
  scroll: React.RefObject<HTMLSpanElement | null>;
  roomId: string;
}

const SendMessage: React.FC<SendMessageProps> = ({ scroll, roomId }) => {
  const { t } = useTranslation();

  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const {
    selectedGif,
    isGifSearchVisible,
    handleGifSelect,
    toggleGifSearch,
    setGifSearchVisible
  } = useGifHandler({user, roomId});

  const sendMessage = async (event?: FormEvent) => {
    if (event) event.preventDefault();

    if ((!message.trim() && !selectedGif) || !user) {
      return;
    }

    try {
      await ChatService.sendMessage({
        type: 'text',
        text: message.trim(),
        name: user.displayName,
        avatar: user.photoURL,
        uid: user.uid,
        roomId,
      });
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
        placeholder={t("chatRoom.messagePlaceholder")}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">{t("chatRoom.send")}</button>
      <button type="button" ref={toggleButtonRef} onClick={toggleGifSearch}>
        {isGifSearchVisible ? t("gifs.hide") : t("gifs.show")}
      </button>
      {isGifSearchVisible && (
        <GifSearch 
          isGifSearchVisible={isGifSearchVisible} 
          onGifSelect={handleGifSelect} 
          setGifSearchVisible={setGifSearchVisible}
          toggleButtonRef={toggleButtonRef}
        />
      )}
    </form>
  );
};

export default SendMessage;