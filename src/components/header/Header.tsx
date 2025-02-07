"use client";

import { useEffect, useState } from "react";
import ThemeBtn from "../global/ThemeBtn";
import ConnectBtn from "../global/ConnectBtn";
import { useLenis } from "lenis/react";
import Link from "next/link";
export default function Header() {
  const lenis = useLenis();

  const [isNavOpen, setNavOpen] = useState(false);

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isNavOpen]);

  const handleBurgerBtn = () => {
    setNavOpen(!isNavOpen);
  };

  const handleScrollTo = (id: string) => {
    setNavOpen(false);

    lenis?.scrollTo(id, {
      duration: 3,
    });
  };

  return (
    <div className="relative">
      <div className="w-full p-4 flex justify-between items-center ">
        <Link
          onClick={() => {
            if (isNavOpen) setNavOpen(false);
          }}
          href="/"
          className="uppercase font-bold text-primary"
        >
          ethereal
        </Link>
        <div className="flex items-center gap-3 max-w-[70%]">
          <ConnectBtn />
          <button
            onClick={handleBurgerBtn}
            className="border-[0.2px] border-foreground p-2 rounded"
          >
            <div className="group grid justify-items-center gap-[3px]">
              <span
                className={`h-[1px] w-4 rounded-full bg-foreground transition  ${
                  isNavOpen ? "rotate-45 translate-y-1" : ""
                }`}
              ></span>
              <span
                className={`h-[1px] w-4 rounded-full bg-foreground transition ${
                  isNavOpen ? "scale-x-0" : ""
                }`}
              ></span>
              <span
                className={`h-[1px] w-4 rounded-full bg-foreground transition  ${
                  isNavOpen ? "-rotate-45 -translate-y-1" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>
      <nav
        className={`bg-background absolute top-full left-0 w-full h-screen transition-transform duration-300 ${
          isNavOpen ? "none translate-y-0" : "block translate-y-full"
        }`}
      >
        <div
          className={`flex flex-col justify-center items-center gap-20 mt-20 transition delay-200 ${
            isNavOpen ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col justify-center items-center gap-5">
            <button
              onClick={() => handleScrollTo("#heroSection")}
              className="font-bold text-2xl"
            >
              Hero
            </button>
            <button
              onClick={() => handleScrollTo("#featuresSection")}
              className="font-bold text-2xl"
            >
              Features
            </button>
            <button
              onClick={() => handleScrollTo("#ctaSection")}
              className="font-bold text-2xl"
            >
              Explore
            </button>
          </div>
          <ThemeBtn />
        </div>
      </nav>
    </div>
  );
}
