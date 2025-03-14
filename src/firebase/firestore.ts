import { app } from "./";
import { getFirestore, Firestore } from "firebase/firestore";

const db: Firestore = getFirestore(app);

export { db };