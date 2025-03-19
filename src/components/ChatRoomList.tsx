import React, { useEffect, useState } from 'react';
import { ChatRoom } from '../types/chat';
import { ChatRoomService } from '../services';
import { useAuth } from '../hooks';
import { formatLastSeen } from '../utils/dateUtils';

interface ChatRoomListProps {
  onRoomSelect: (roomId: string) => void;
  selectedRoomId?: string;
}

const ChatRoomList: React.FC<ChatRoomListProps> = ({ onRoomSelect, selectedRoomId }) => {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const unsubscribe = ChatRoomService.subscribeToChatRooms(user.uid, (updatedRooms) => {
      setRooms(updatedRooms);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="chat-room-list">
      <div className="chat-room-list__rooms">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`chat-room-item ${selectedRoomId === room.id ? 'selected' : ''}`}
            onClick={() => onRoomSelect(room.id)}
          >
            <div className="chat-room-item__info">
              <h3 className="chat-room-item__name">{room.name}</h3>
              {room.lastMessage && (
                <p className="chat-room-item__last-message">
                  {room.lastMessage.text}
                  <span className="chat-room-item__time">
                    {formatLastSeen(room.lastMessage.timestamp)}
                  </span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRoomList; 