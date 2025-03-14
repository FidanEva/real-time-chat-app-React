import React from "react";
import { useAuth } from "../hooks";
import { NavigationService } from "../services";
import TheneToggler from "./ThemeToggler";
import { useTranslation } from "react-i18next";
import { LanguageController } from "./LanguageController";

const NavBar: React.FC = () => {
  const { logout } = useAuth();
  const { t } = useTranslation();

  const handleLogout = async () => {
    await logout();
    NavigationService.goToLogin();
  };

  return (
    <nav className="nav-bar">
      <h1>{t("navbar.title")}</h1>
      <div className="flex gap-5 m-2">
        <LanguageController />
        <TheneToggler />
        <button onClick={handleLogout} className="sign-out" type="button">
          {t("navbar.signOut")}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;