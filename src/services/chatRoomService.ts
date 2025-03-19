import { collection, query, where, getDocs, doc, setDoc, addDoc, onSnapshot, Unsubscribe, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { ChatRoom } from "../types/chat";

const CHAT_ROOMS_COLLECTION = "chatRooms";

export class ChatRoomService {
  private static collectionRef = collection(db, CHAT_ROOMS_COLLECTION);

  static async createChatRoom(room: Omit<ChatRoom, 'id' | 'createdAt'>): Promise<string> {
    try {
      const docRef = await addDoc(this.collectionRef, {
        ...room,
        createdAt: Timestamp.now(),
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating chat room:', error);
      throw new Error('Failed to create chat room');
    }
  }

  static async getUserChatRooms(userId: string): Promise<ChatRoom[]> {
    try {
      const q = query(
        this.collectionRef,
        where("members", "array-contains", userId)
      );

      const snapshot = await getDocs(q);
      const rooms = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt instanceof Timestamp ? doc.data().createdAt.toDate() : new Date(doc.data().createdAt),
        lastMessage: doc.data().lastMessage ? {
          ...doc.data().lastMessage,
          timestamp: doc.data().lastMessage.timestamp instanceof Timestamp ? 
            doc.data().lastMessage.timestamp.toDate() : 
            new Date(doc.data().lastMessage.timestamp)
        } : undefined
      })) as ChatRoom[];

      return rooms.sort((a, b) => {
        const aTime = a.lastMessage?.timestamp || a.createdAt;
        const bTime = b.lastMessage?.timestamp || b.createdAt;
        return bTime.getTime() - aTime.getTime();
      });
    } catch (error) {
      console.error('Error getting user chat rooms:', error);
      throw new Error('Failed to get user chat rooms');
    }
  }

  static subscribeToChatRooms(userId: string, callback: (rooms: ChatRoom[]) => void): Unsubscribe {
    const q = query(
      this.collectionRef,
      where("members", "array-contains", userId)
    );

    return onSnapshot(q, (snapshot) => {
      const rooms = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt instanceof Timestamp ? doc.data().createdAt.toDate() : new Date(doc.data().createdAt),
        lastMessage: doc.data().lastMessage ? {
          ...doc.data().lastMessage,
          timestamp: doc.data().lastMessage.timestamp instanceof Timestamp ? 
            doc.data().lastMessage.timestamp.toDate() : 
            new Date(doc.data().lastMessage.timestamp)
        } : undefined
      })) as ChatRoom[];
      callback(rooms);
    });
  }

  static async updateLastMessage(roomId: string, text: string): Promise<void> {
    try {
      const roomRef = doc(db, CHAT_ROOMS_COLLECTION, roomId);
      await setDoc(roomRef, {
        lastMessage: {
          text,
          timestamp: Timestamp.now(),
        },
      }, { merge: true });
    } catch (error) {
      console.error('Error updating last message:', error);
      throw new Error('Failed to update last message');
    }
  }
}