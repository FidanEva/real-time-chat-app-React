import React from "react";
import { useTheme } from "../hooks";
import { useTranslation } from "react-i18next";

const ThemeToggler: React.FC = () => {
  const { t } = useTranslation();
  const { isDark, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 px-4 rounded-lg transition-all duration-300 
                bg-[var(--bg-contrast)] text-[var(--text-primary)]
                hover:bg-[var(--primary)] hover:text-white
                flex items-center gap-2"
    >
      <span className="text-xl">{!isDark ? "🌙" : "☀️"}</span>
      <span className="text-sm font-medium">{!isDark ? t("navbar.dark") : t("navbar.light")}</span>
    </button>
  );
};

export default ThemeToggler;
