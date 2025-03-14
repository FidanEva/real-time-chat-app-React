import React from "react";
import { useAuth } from "../hooks";
import { NavigationService } from "../services";
import TheneToggler from "./ThemeToggler";

const NavBar: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    NavigationService.goToLogin();
  };

  return (
    <nav className="nav-bar">
      <h1>React Chat</h1>
      <div className="flex">
        <button onClick={handleLogout} className="sign-out" type="button">
          Sign Out
        </button>
        <TheneToggler></TheneToggler>
      </div>
    </nav>
  );
};

export default NavBar;