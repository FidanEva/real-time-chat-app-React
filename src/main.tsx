import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.js";
import { AuthProvider } from "./contexts/AuthContext.js";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
       <App />
    </AuthProvider>
  </StrictMode>
);