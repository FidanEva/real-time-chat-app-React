export interface Message {
  id: string;
  uid: string;
  text?: string;
  gifUrl?: string;
  name: string;
  avatar: string;
  createdAt: Date;
  type: 'text' | 'gif';
}

export interface ChatMessage {
  type: 'text' | 'gif';
  text?: string;
  gifUrl?: string;
  name: string | null;
  avatar: string | null;
  uid: string;
}