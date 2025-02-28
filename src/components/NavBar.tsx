import React from "react";
import GoogleSignin from "../assets/btn_google_signin_dark_pressed_web.png";
import { useAuth } from "../hooks/useAuth";

const NavBar: React.FC = () => {
  const { user, signInWithGoogle, logout } = useAuth();

  return (
    <nav className="nav-bar">
      <h1>React Chat</h1>
      {user ? (
        <button onClick={logout} className="sign-out" type="button">
          Sign Out
        </button>
      ) : (
        <button className="sign-in" type="button" onClick={signInWithGoogle}>
          <img
            src={GoogleSignin}
            alt="sign in with google"
          />
        </button>
      )}
    </nav>
  );
};

export default NavBar;