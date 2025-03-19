import { collection, query, where, getDocs, doc, setDoc, updateDoc, onSnapshot, Unsubscribe } from "firebase/firestore";
import { db } from "../firebase";
import { ChatUser } from "../types/chat";

const USERS_COLLECTION = "users";

export class UserService {
  private static collectionRef = collection(db, USERS_COLLECTION);

  static async createOrUpdateUser(user: ChatUser): Promise<void> {
    try {
      const userRef = doc(db, USERS_COLLECTION, user.uid);
      await setDoc(userRef, {
        ...user,
        email: user.email.toLowerCase(),
      }, { merge: true });
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }

  static async searchUsers(email: string): Promise<ChatUser[]> {
    try {
      const searchEmail = email.toLowerCase().trim();
      if (searchEmail.length < 3) {
        return [];
      }

      const q = query(
        this.collectionRef,
        where("email", ">=", searchEmail),
        where("email", "<=", searchEmail + "\uf8ff")
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        ...doc.data(),
        uid: doc.id,
      })) as ChatUser[];
    } catch (error) {
      console.error('Error searching users:', error);
      if (error instanceof Error && error.message.includes('index')) {
        console.error('Missing Firestore index. Please create a composite index for the email field.');
      }
      throw error;
    }
  }

  static async updateUserStatus(uid: string, status: 'online' | 'offline'): Promise<void> {
    try {
      const userRef = doc(db, USERS_COLLECTION, uid);
      await updateDoc(userRef, {
        status,
        lastSeen: new Date(),
      });
    } catch (error) {
      console.error('Error updating user status:', error);
      throw new Error('Failed to update user status');
    }
  }

  static subscribeToUserStatus(uid: string, callback: (user: ChatUser) => void): Unsubscribe {
    const userRef = doc(db, USERS_COLLECTION, uid);
    return onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        callback({
          ...doc.data(),
          uid: doc.id,
        } as ChatUser);
      }
    });
  }
} 