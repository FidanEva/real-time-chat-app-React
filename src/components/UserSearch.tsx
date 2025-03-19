import React, { useState } from 'react';
import { ChatRoomService, UserService } from '../services';
import { ChatUser } from '../types/chat';
import { useAuth } from '../hooks';
import { useTranslation } from 'react-i18next';

interface UserSearchProps {
  onChatStart: (roomId: string) => void;
}

const UserSearch: React.FC<UserSearchProps> = ({ onChatStart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<ChatUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { t } = useTranslation();

  let searchTimeout: NodeJS.Timeout;

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setSearchTerm(email);
    setError(null);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    if (email.length < 3) {
      setSearchResults([]);
      return;
    }

    searchTimeout = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await UserService.searchUsers(email);
        setSearchResults(results.filter(u => u.uid !== user?.uid));
        if (results.length === 0 && searchTerm !== '') {
          setError(t('user.noUsersFound'));
        }
      } catch (error) {
        console.error('Error searching users:', error);
        setError('${error}');
      } finally {
        setIsSearching(false);
      }
    }, 500);
  };

  const startChat = async (selectedUser: ChatUser) => {
    if (!user) return;

    try {
      setIsSearching(true);
      setError(null);

      const existingRooms = await ChatRoomService.getUserChatRooms(user.uid);
      const existingRoom = existingRooms.find(room => 
        room.type === 'private' && 
        room.members.length === 2 &&
        room.members.includes(user.uid) &&
        room.members.includes(selectedUser.uid)
      );

      let roomId: string;
      if (existingRoom) {
        roomId = existingRoom.id;
      } else {
        roomId = await ChatRoomService.createChatRoom({
          name: selectedUser.displayName,
          type: 'private',
          members: [user.uid, selectedUser.uid],
        });
      }

      onChatStart(roomId);
      setSearchTerm('');
      setSearchResults([]);
    } catch (error) {
      console.error('Error creating/finding chat room:', error);
      setError(t('chatRoom.error'));
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="user-search">
      <input
        type="email"
        value={searchTerm}
        onChange={handleSearch}
        placeholder={t('user.search')}
        className="user-search__input"
      />
      
      {isSearching && <div className="user-search__loading">{t('search.searching')}</div>}
      {error && <div className="user-search__error">{error}</div>}
      
      <div className="user-search__results">
        {searchResults.map((user) => (
          <div key={user.uid} className="user-search__item" onClick={() => startChat(user)}>
            <img src={user.photoURL} alt={user.displayName} className="user-search__avatar" />
            <div className="user-search__info">
              <div className="user-search__name">{user.displayName}</div>
              <div className="user-search__email">{user.email}</div>
              <div className="user-search__status">
                <span className={`status-dot ${user.status}`} />
                {user.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserSearch; 