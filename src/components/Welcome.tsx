import React from "react";
import GoogleSignin from "../assets/btn_google_signin_dark_pressed_web.png";
import { useAuth } from "../hooks/useAuth";

const Welcome: React.FC = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <main className="welcome">
      <h2>Welcome to React Chat.</h2>
      <img src="/logo512.png" alt="ReactJs logo" width={50} height={50} />
      <p>Sign in with Google to chat with your fellow React Developers.</p>
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
