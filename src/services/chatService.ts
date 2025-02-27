import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const chatCollectionRef = collection(db, "messages");

export const sendMessage = async (text: string, userId: string) => {
  await addDoc(chatCollectionRef, {
    text,
    userId,
    timestamp: new Date(),
  });
};

export const subscribeToMessages = (callback: (messages: any[]) => void) => {
  const q = query(chatCollectionRef, orderBy("timestamp"));
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  });
};