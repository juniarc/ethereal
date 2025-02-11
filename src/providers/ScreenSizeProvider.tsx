"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ScreenSizeContext = createContext<{
  deviceType: "mobile" | "tablet" | "desktop";
  screenSize: number;
}>({
  deviceType: "mobile",
  screenSize: 0,
});

export const ScreenSizeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">(
    "mobile"
  );
  const [screenSize, setScreenSize] = useState(0);

  const handleResize = () => {
    if (typeof window !== undefined) {
      if (window.innerWidth <= 768) {
        setDeviceType("mobile");
        setScreenSize(window.innerWidth);
      } else if (window.innerWidth > 768 && window.innerWidth <= 1024) {
        setDeviceType("tablet");
        setScreenSize(window.innerWidth);
      } else {
        setDeviceType("desktop");
        setScreenSize(window.innerWidth);
      }
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <ScreenSizeContext.Provider value={{ deviceType, screenSize }}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

export const useScreenSizeContext = () => {
  const context = useContext(ScreenSizeContext);
  if (!context) {
    throw new Error(
      "useScreenSizeContext must be used within a useScreenSizeProvider"
    );
  }

  return context;
};
