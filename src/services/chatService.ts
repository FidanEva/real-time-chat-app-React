import { collection, addDoc, query, orderBy, where, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db } from "../firebase";
import { ChatMessage, Message } from "../types/chat";
import { ChatRoomService } from "./";

const MESSAGES_COLLECTION = "messages";

export class ChatService {
  private static collectionRef = collection(db, MESSAGES_COLLECTION);

  static async sendMessage(message: ChatMessage): Promise<void> {
    try {
      await addDoc(this.collectionRef, {
        ...message,
        createdAt: new Date(),
      });

      if (message.text) {
        await ChatRoomService.updateLastMessage(message.roomId, message.text);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message');
    }
  }

  static subscribeToMessages(roomId: string, callback: (messages: Message[]) => void): Unsubscribe {
    const q = query(
      this.collectionRef,
      where("roomId", "==", roomId),
      orderBy("createdAt", "asc"),
    );

    return onSnapshot(q, 
      (snapshot) => {
        const messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
        })) as Message[];

        callback(messages);
      },
      (error) => {
        console.error('Error in snapshot listener:', error);
        if (error.code === 'failed-precondition') {
          console.error('Index is not ready yet. Please wait a few minutes for the index to build.');
        }
      }
    );
  }
}