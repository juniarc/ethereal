"use client";

import Link from "next/link";
import {
  FaTiktok,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaRegCopyright,
} from "react-icons/fa6";
import ThemeBtn from "./ThemeBtn";
import ConnectBtn from "./ConnectBtn";
import { useLenis } from "lenis/react";

export default function Footer() {
  const lenis = useLenis();

  const handleScrollTo = (id: string) => {
    lenis?.scrollTo(id, {
      duration: 3,
    });
  };
  return (
    <footer className="w-screen p-10 ">
      <div className="flex flex-col items-center gap-10">
        <Link href="/" className="uppercase font-bold text-primary">
          ethereal
        </Link>
        <ul className="font-bold flex items-center gap-10 md:text-2xl">
          <li>
            <button
              onClick={() => handleScrollTo("#heroSection")}
              className="font-bold hover:text-primary transition-colors duration-200 ease-in"
            >
              Hero
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScrollTo("#featuresSection")}
              className="font-bold hover:text-primary transition-colors duration-200 ease-in"
            >
              Features
            </button>
          </li>
          <li>
            <button
              onClick={() => handleScrollTo("#ctaSection")}
              className="font-bold hover:text-primary transition-colors duration-200 ease-in"
            >
              Explore
            </button>{" "}
          </li>
        </ul>
        <ul className="font-bold flex items-center gap-10 text-2xl md:text-2xl">
          <li>
            <Link href="*" aria-label="Ethereal's TikTok">
              <FaTiktok />
            </Link>
          </li>
          <li>
            <Link href="*" aria-label="Ethereal's Instagram">
              <FaInstagram />
            </Link>
          </li>
          <li>
            <Link href="*" aria-label="Ethereal's Twitter">
              <FaXTwitter />
            </Link>
          </li>
          <li>
            <Link href="*" aria-label="Ethereal's YouTube">
              <FaYoutube />
            </Link>
          </li>
        </ul>
        <div className="flex flex-col items-center gap-5 md:gap-10">
          <ThemeBtn />
          <ConnectBtn />
        </div>
        <div className="flex items-center gap-2">
          <FaRegCopyright />
          <p>2025 JUNIARC</p>
        </div>
      </div>
    </footer>
  );
}
