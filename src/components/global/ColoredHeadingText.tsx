"use client";

import { useGSAPContext } from "@/providers/GSAPProvider";
import { useMountedContext } from "@/providers/MountContext";
import { useScreenSizeContext } from "@/providers/ScreenSizeProvider";
import { useRef } from "react";

export default function ColorenHeadingText({
  text,
  coloredTextIndex,
  filter,
  start = "top 80%",
  gradient,
  classname,
  coloredTextClassname,
}: {
  text: string;
  coloredTextIndex: number;
  filter: string;
  start?: string;
  gradient: string;
  classname?: string;
  coloredTextClassname?: string;
}) {
  const { useGSAP, gsap } = useGSAPContext();
  const { isMounted } = useMountedContext();
  const { screenSize } = useScreenSizeContext();

  const headingRef = useRef<HTMLHeadingElement>(null);
  const overlayRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const words = headingRef.current?.querySelectorAll(".word");

      if (words && isMounted) {
        console.log("resize");
        gsap.from(words, {
          translateY: "100%",
          duration: 1.5,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: headingRef.current,
            start: start,
          },
        });
        gsap.from(overlayRef.current, {
          translateY: "110%",
          duration: 1.5,
          ease: "power4.out",
          stagger: 0.05 * (coloredTextIndex + 1),
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        });
      }
    },
    { dependencies: [isMounted, screenSize], revertOnUpdate: true }
  );
  if (!isMounted) return;
  return (
    <h2
      ref={headingRef}
      className={`relative md:text-[5vw] md:leading-[6vw] text-[10vw] leading-[10vw] font-extrabold md:w-3/4 text-center ${classname} `}
      suppressHydrationWarning
    >
      {text.split(" ").map((word, index, array) =>
        index === coloredTextIndex ? (
          <div key={index} className="relative inline-block overflow-hidden">
            <span className="relative overflow-hidden">
              <span
                className={`word inline-block overflow-hidden lg:px-[0.2em] p-[0.2em] m-[-0.2em] ${coloredTextClassname}`}
              >
                {word}
              </span>
              <span
                className={`pointer-events-none absolute inset-0 w-full h-full ${filter}`}
              >
                <span
                  ref={overlayRef}
                  className={`pointer-events-none absolute md:-top-[20%] left-0 top-0 w-full h-full ${gradient}`}
                ></span>
              </span>
            </span>
            {index < array.length - 1 && <span>{"\u00A0"}</span>}
          </div>
        ) : (
          <div key={index} className="relative inline-block overflow-hidden">
            <span className="word inline-block overflow-hidden lg:px-[0.2em] p-[0.2em] m-[-0.2em]">
              {word}
            </span>
            {index < array.length - 1 && <span>{"\u00A0"}</span>}
          </div>
        )
      )}
    </h2>
  );
}
