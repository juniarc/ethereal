"use client";
import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import { useScreenSizeContext } from "@/providers/ScreenSizeProvider";
import HeaderDesktop from "./HeaderDesktop";
import { useGSAPContext } from "@/providers/GSAPProvider";

export default function HeaderWrapper() {
  const { useGSAP, gsap } = useGSAPContext();

  const wrapperRef = useRef<HTMLDivElement>(null);

  const { deviceType, screenSize } = useScreenSizeContext();
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useGSAP(
    () => {
      if (isMounted) {
        gsap.from(wrapperRef.current, {
          translateY: "-100%",
          duration: 1.5,
          delay: 1,
          ease: "power2.out",
        });
      }
    },
    { dependencies: [screenSize, isMounted], revertOnUpdate: true }
  );

  if (!isMounted) return;
  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ease-in ${
        isHidden
          ? "-translate-y-full"
          : `translate-y-0 ${lastScrollY !== 0 && "bg-dark-blue"}`
      }`}
    >
      <div ref={wrapperRef}>
        {deviceType === "desktop" ? <HeaderDesktop /> : <Header />}
      </div>
    </header>
  );
}
