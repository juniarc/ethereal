"use client";
import { useGSAPContext } from "@/providers/GSAPProvider";
import { useScreenSizeContext } from "@/providers/ScreenSizeProvider";
import React, { useRef } from "react";

export const RotatedDevice = ({ children }: { children: React.ReactNode }) => {
  const { gsap, useGSAP } = useGSAPContext();
  const { screenSize } = useScreenSizeContext();

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (cardRef.current && containerRef.current) {
        gsap.fromTo(
          cardRef.current,
          {
            rotateX: 100,
            // scale: deviceType === "mobile" ? 0.7 : 1.05,
            y: 0,
          },
          {
            rotateX: 0,
            // scale: deviceType === "mobile" ? 0.9 : 1,
            // y: -100,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          }
        );
      }
    },
    { dependencies: [screenSize], revertOnUpdate: true }
  );

  return (
    <div
      className="flex items-center justify-center relative p-2 md:p-20 my-20 md:my-10"
      ref={containerRef}
    >
      <div className="w-full relative" style={{ perspective: "1000px" }}>
        <Card ref={cardRef}>{children}</Card>
      </div>
    </div>
  );
};

const Card = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
        style={{
          boxShadow:
            "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
        }}
      >
        <div className="h-full w-full overflow-hidden rounded-2xl  dark:bg-zinc-900 md:rounded-2xl md:p-4">
          {children}
        </div>
      </div>
    );
  }
);
Card.displayName = "Card";
