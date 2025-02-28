import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  DocumentData,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firestore";
import Message from "./Message";
import SendMessage from "./SendMessage";


const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const scroll = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot: QuerySnapshot<DocumentData>) => {

      const fetchedMessages: any[] = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      const sortedMessages = fetchedMessages.sort((a, b) => a.createdAt - b.createdAt);
      setMessages(sortedMessages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <span ref={scroll}></span>
      <SendMessage />
    </main>
  );
};

export default ChatBox;
