export interface Message {
  id: string;
  uid: string;
  text: string;
  name: string;
  avatar: string;
  createdAt: Date;
}

export interface ChatMessage {
  text: string;
  name: string | null;
  avatar: string | null;
  uid: string;
}