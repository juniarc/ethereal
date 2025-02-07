"use client";

import { useTheme } from "next-themes";
import { AiOutlineSun, AiOutlineMoon } from "react-icons/ai";
import ConnectBtn from "../global/ConnectBtn";
import Link from "next/link";
import { useLenis } from "lenis/react";

export default function HeaderDesktop() {
  const lenis = useLenis();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleScrollTo = (id: string) => {
    lenis?.scrollTo(id, {
      duration: 3,
    });
  };
  return (
    <div className="relative flex items-center justify-between px-10 py-5">
      <div>
        <Link href="/" className="uppercase font-bold text-primary">
          ethereal
        </Link>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className=" flex justify-center items-center gap-5">
          <button
            onClick={() => handleScrollTo("#heroSection")}
            className="font-bold hover:text-primary transition-colors duration-200 ease-in"
          >
            Hero
          </button>
          <button
            onClick={() => handleScrollTo("#featuresSection")}
            className="font-bold hover:text-primary transition-colors duration-200 ease-in"
          >
            Features
          </button>
          <button
            onClick={() => handleScrollTo("#ctaSection")}
            className="font-bold hover:text-primary transition-colors duration-200 ease-in"
          >
            Explore
          </button>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button onClick={toggleTheme} aria-label="Toggle dark mode">
          {theme === "dark" ? (
            <AiOutlineSun className="text-2xl  hover:scale-110 transition-transform" />
          ) : (
            <AiOutlineMoon className="text-2xl  hover:scale-110 transition-transform" />
          )}
        </button>
        <ConnectBtn />
      </div>
    </div>
  );
}
