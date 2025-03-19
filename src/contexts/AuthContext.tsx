import React, { createContext, useEffect, useState, ReactNode } from "react";
import {
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { UserService } from "../services";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  error: Error | null;
  isAuthenticated: boolean;
  signInWithGoogle: () => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      provider.addScope("profile");
      provider.addScope("email");
  
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      console.error("Popup failed:", error);
  
      if (error.code === "auth/popup-blocked" || error.code === "auth/operation-not-supported-in-this-environment") {
        await signInWithRedirect(auth, provider);
      } else {
        throw error;
      }
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      await UserService.createOrUpdateUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email || "",
        displayName: userCredential.user.displayName || "Anonymous",
        photoURL: userCredential.user.photoURL || "",
        status: "online",
        lastSeen: new Date(),
      });
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to sign up"));
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      await UserService.updateUserStatus(userCredential.user.uid, "online");
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to sign in"));
    }
  };

  const logout = async () => {
    try {
      if (user) {
        await UserService.updateUserStatus(user.uid, "offline");
      }
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to sign out"));
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          await UserService.createOrUpdateUser({
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || 'Anonymous',
            photoURL: user.photoURL || '',
            status: 'online',
            lastSeen: new Date(),
          });
        } catch (error) {
          console.error('Error updating user in Firestore:', error);
        }
      }
      setLoading(false);
      setError(null);
    }, (err) => {
      setError(err);
      setLoading(false);
    });
    
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        signInWithGoogle,
        signUpWithEmail,
        signInWithEmail,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};