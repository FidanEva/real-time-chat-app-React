import React from "react";
import GoogleSignin from "../assets/btn_google_signin_dark_pressed_web.png";
import { useAuth } from "../hooks/useAuth";
import { NavigationService } from "../services/navigationService";

const NavBar: React.FC = () => {
  const { user, signInWithGoogle, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    NavigationService.goToHome();
  };

  return (
    <nav className="nav-bar">
      <h1>React Chat</h1>
      {user ? (
        <button onClick={handleLogout} className="sign-out" type="button">
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