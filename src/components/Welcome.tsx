import React from "react";
import GoogleSignin from "../assets/btn_google_signin_dark_pressed_web.png";
import { useAuth } from "../hooks/useAuth";
import { NavigationService } from "../services/navigationService";
import { useEffect } from "react";

const Welcome: React.FC = () => {
  const { signInWithGoogle, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      NavigationService.goToChat();
    }
  }, [isAuthenticated]);

  return (
    <main className="welcome">
      <h2>Welcome to React Chat.</h2>
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
