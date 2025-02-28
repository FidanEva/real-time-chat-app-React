import { collection, addDoc, query, orderBy, onSnapshot, limit, Unsubscribe } from "firebase/firestore";
import { db } from "../firebase/firestore";
import { ChatMessage, Message } from "../types/chat";

const MESSAGES_COLLECTION = "messages";
const MESSAGE_LIMIT = 50;

export class ChatService {
  private static collectionRef = collection(db, MESSAGES_COLLECTION);

  static async sendMessage(message: ChatMessage): Promise<void> {
    try {
      await addDoc(this.collectionRef, {
        ...message,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message');
    }
  }

  static subscribeToMessages(callback: (messages: Message[]) => void): Unsubscribe {
    const q = query(
      this.collectionRef,
      orderBy("createdAt", "desc"),
      limit(MESSAGE_LIMIT)
    );

    return onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      })) as Message[];

      callback(messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()));
    });
  }
}