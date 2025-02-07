"use client";

import { useLenis } from "lenis/react";
import { createContext, useContext, useEffect, useState } from "react";

export const MountContext = createContext({ isMounted: false });

export const MountProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis?.scrollTo(0, { immediate: true });
    }
    setIsMounted(true);
  }, []);

  return (
    <MountContext.Provider value={{ isMounted: isMounted }}>
      {children}
    </MountContext.Provider>
  );
};

export const useMountedContext = () => {
  const context = useContext(MountContext);
  if (!context) {
    throw new Error("useMountedContext must be used within a MountProvider");
  }
  return context;
};
