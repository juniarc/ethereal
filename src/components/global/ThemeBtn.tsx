"use client";

import { useTheme } from "next-themes";
import { AiOutlineSun } from "react-icons/ai";

export default function ThemeBtn() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <button onClick={toggleTheme} className="flex items-center gap-2">
      <span>Light Theme</span>
      <span>
        <AiOutlineSun className="text-xl md:text-2xl" />
      </span>
    </button>
  );
}
