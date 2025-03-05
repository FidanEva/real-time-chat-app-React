import { useState, useEffect } from "react";
import { Gif } from "../types/giph";
import { ChatService } from "../services/chatService";
import { User } from "firebase/auth";

const useGifHandler = (user: User | null) => {
  const [selectedGif, setSelectedGif] = useState<Gif | null>(null);
  const [isGifSearchVisible, setIsGifSearchVisible] = useState(false);

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

  const sendGifMessage = async () => {
    if (!selectedGif || !user) return;

    try {
      await ChatService.sendMessage({
        type: 'gif',
        gifUrl: selectedGif.images.fixed_height.url,
        name: user.displayName,
        avatar: user.photoURL,
        uid: user.uid,
      });
      handleGifSent();
    } catch (error) {
      console.error("Error sending GIF message:", error);
    }
  };

  useEffect(() => {
    if (selectedGif) {
      sendGifMessage();
    }
  }, [selectedGif]);

  return {
    selectedGif,
    isGifSearchVisible,
    handleGifSelect,
    toggleGifSearch,
  };
};

export default useGifHandler;