import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/AuthContext.js";
import App from "./App.js";
import "./index.css";
import "./i18n.js"
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
       <App />
    </AuthProvider>
  </StrictMode>
);