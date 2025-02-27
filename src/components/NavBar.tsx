import React, { useEffect } from "react";
import GoogleSignin from "../assets/btn_google_signin_dark_pressed_web.png";
import { auth } from "../firebase.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";

const NavBar: React.FC = () => {
  const [user] = useAuthState(auth);

  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          console.log("Sign in successful");
        }
      })
      .catch((error) => {
        console.error("Sign in failed", error);
      });
  }, []);

  const googleSignIn = (): void => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  const signOut = (): void => {
    auth.signOut();
  };

  return (
    <nav className="nav-bar">
      <h1>React Chat</h1>
      {user ? (
        <button onClick={signOut} className="sign-out" type="button">
          Sign Out
        </button>
      ) : (
        <button className="sign-in" type="button" onClick={googleSignIn}>
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