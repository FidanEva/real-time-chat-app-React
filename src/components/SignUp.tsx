import React, { useState, useEffect } from "react";
import GoogleSignin from "../assets/btn_google_signin_dark_pressed_web.png";
import { useAuth } from "../hooks";
import { NavigationService } from "../services";
import { useTranslation } from "react-i18next";

const LogIn: React.FC = () => {
  const { t } = useTranslation();
  const { signInWithEmail, signInWithGoogle, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailSignIn = async () => {
    if (password !== confirmPassword) {
      setError(t("auth.passwordMismatch"));
      return;
    }

    try {
      await signInWithEmail(email, password);
    } catch (error) {
      console.error("Email sign-in failed:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      NavigationService.goToChat();
    }
  }, [isAuthenticated]);

  return (
    <main className="welcome">
      <h2>{t("auth.welcome")}</h2>

      <input
        type="email"
        placeholder={t("auth.email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder={t("auth.password")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder={t("auth.confirmPassword")}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {error && <p className="error">{error}</p>}

      <button className="sign-in" onClick={handleEmailSignIn}>
        {t("auth.signInWithEmail")}
      </button>

      <button className="sign-in" onClick={signInWithGoogle}>
        <img
          src={GoogleSignin}
          alt="sign in with google"
        />
      </button>
    
        <button onClick={NavigationService.goToLogin}>Login</button>
    </main>
  );
};

export default LogIn;
