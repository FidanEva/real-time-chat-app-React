export interface Message {
  id: string;
  uid: string;
  text?: string;
  gifUrl?: string;
  name: string;
  avatar: string;
  createdAt: Date;
  type: 'text' | 'gif';
  roomId: string;
}

export interface ChatMessage {
  type: 'text' | 'gif';
  text?: string;
  gifUrl?: string;
  name: string | null;
  avatar: string | null;
  uid: string;
  roomId: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  type: 'private' | 'group';
  members: string[];
  createdAt: Date;
  lastMessage?: {
    text: string;
    timestamp: Date;
  };
}

export interface ChatUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  status: 'online' | 'offline';
  lastSeen: Date;
}