import { useState, useEffect } from "react";
import { Gif } from "../types/giph";
import { ChatService } from "../services";
import { User } from "firebase/auth";

interface UseGifHandlerProps {
  user: User | null;
  roomId?: string;
}

export const useGifHandler = ({ user, roomId }: UseGifHandlerProps) => {
  const [selectedGif, setSelectedGif] = useState<Gif | null>(null);
  const [isGifSearchVisible, setIsGifSearchVisible] = useState(false);

  const handleGifSelect = (gif: Gif) => {
    setSelectedGif(gif);
    setIsGifSearchVisible(false);
  };

  const handleGifSent = () => {
    setSelectedGif(null);
  };

  const setGifSearchVisible = (value: boolean) => {
    setIsGifSearchVisible(value);
  };

  const toggleGifSearch = () => {
    setIsGifSearchVisible((prev) => !prev);
  };

  const sendGifMessage = async () => {
    if (!selectedGif || !user || !roomId) return;

    try {
      await ChatService.sendMessage({
        type: 'gif',
        gifUrl: selectedGif.images.fixed_height.url,
        name: user.displayName,
        avatar: user.photoURL,
        uid: user.uid,
        roomId,
      });
      handleGifSent();
    } catch (error) {
      console.error("Error sending GIF message:", error);
    }
  };

  useEffect(() => {
    if (selectedGif && roomId) {
      sendGifMessage();
    }
  }, [selectedGif, roomId]);

  return {
    selectedGif,
    isGifSearchVisible,
    handleGifSelect,
    toggleGifSearch,
    setGifSearchVisible
  };
};