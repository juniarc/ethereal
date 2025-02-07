"use client";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createContext, useContext, useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

interface GSAPContextProps {
  gsap: typeof gsap;
  useGSAP: typeof useGSAP;
  ScrollTrigger: typeof ScrollTrigger;
}

const GSAPContext = createContext<GSAPContextProps | null>(null);

export const GSAPProvider = ({ children }: { children: React.ReactNode }) => {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <GSAPContext.Provider value={{ gsap, useGSAP, ScrollTrigger }}>
      {children}
    </GSAPContext.Provider>
  );
};

export const useGSAPContext = () => {
  const context = useContext(GSAPContext);
  if (!context) {
    throw new Error("useGSAPContext must be used within a GSAPProvider");
  }

  return context;
};
