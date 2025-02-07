"use client";

import { useMountedContext } from "@/providers/MountContext";
import { useTheme } from "next-themes";
import { AiOutlineSun, AiOutlineMoon } from "react-icons/ai";

export default function ThemeBtn() {
  const { theme, setTheme } = useTheme();
  const { isMounted } = useMountedContext();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  if (!isMounted) return;
  return (
    <button onClick={toggleTheme} className="flex items-center gap-2">
      <span>{theme === "dark" ? "Light Theme" : "Dark Theme"}</span>
      <span>
        {theme === "dark" ? (
          <AiOutlineSun className="text-xl md:text-2xl  hover:scale-110 transition-transform" />
        ) : (
          <AiOutlineMoon className="text-xl md:text-2xl hover:scale-110 transition-transform" />
        )}
      </span>
    </button>
  );
}
