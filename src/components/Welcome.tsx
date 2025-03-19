import React, { useEffect } from "react";
import GoogleSignin from "../assets/btn_google_signin_dark_pressed_web.png";
import { useAuth } from "../hooks";
import { NavigationService } from "../services";
import { useTranslation } from "react-i18next";

const Welcome: React.FC = () => {
  const { t } = useTranslation();
  const { signInWithGoogle, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      NavigationService.goToChat();
    }
  }, [isAuthenticated]);

  return (
    <main className="welcome">
      <h2>{t("auth.welcome")}</h2>
      <button className="sign-in" onClick={signInWithGoogle}>
        <img
          src={GoogleSignin}
          alt="sign in with google"
        />
      </button>
    </main>
  );
};

export default Welcome;
