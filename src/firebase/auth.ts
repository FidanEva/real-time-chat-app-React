import app from "./config";
import { getAuth, Auth } from "firebase/auth";

const auth: Auth = getAuth(app);

export { auth };