import React from "react";
import { useTheme } from "../hooks/useTheme";
const TheneToggler: React.FC = () => {
  const { isDark, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg transition bg-[var(--color-bgContrast)]"
    >
      {isDark ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default TheneToggler;
