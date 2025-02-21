import React, { useState } from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";

const NavBar: React.FC = () => {
  const [user, setUser] = useState<boolean>(false);

  const googleSignIn = (): void => {
    setUser(true);
  };

  const signOut = (): void => {
    setUser(false);
  };

  return (
    <nav className="nav-bar">
      <h1>React Chat</h1>
      {user ? (
        <button onClick={signOut} className="sign-out" type="button">
          Sign Out
        </button>
      ) : (
        <button className="sign-in" type="button">
          <img
            onClick={googleSignIn}
            src={GoogleSignin}
            alt="sign in with google"
          />
        </button>
      )}
    </nav>
  );
};

export default NavBar;
