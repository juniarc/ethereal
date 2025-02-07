"use client";

import { useGSAPContext } from "@/providers/GSAPProvider";
import Image from "next/image";
import { useRef } from "react";
import SafeImg from "@/../public/images/safe-image.png";
import { useScreenSizeContext } from "@/providers/ScreenSizeProvider";
import { useMountedContext } from "@/providers/MountContext";
import Link from "next/link";

export default function CTASection() {
  const { gsap, useGSAP } = useGSAPContext();
  const { deviceType } = useScreenSizeContext();
  const { isMounted } = useMountedContext();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const headingText = "Explore the Ultimate NFT Marketplace Now!";

  useGSAP(() => {
    const words = headingRef.current?.querySelectorAll(".word");

    if (isMounted) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 90%",
        },
      });

      if (words) {
        tl.from(words, {
          translateY: "100%",
          duration: 1.5,
          ease: "power4.out",
          stagger: 0.05,
        });
      }
    }
  }, [isMounted]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (deviceType === "desktop") {
        gsap.to(imageRef.current, {
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top bottom",
            endTrigger: "footer",
            end: "bottom bottom",
            scrub: true,
          },
          translateY: 0,
        });
      }
    });

    return () => ctx.revert();
  }, [deviceType]);
  if (!isMounted) return;
  return (
    <div
      ref={wrapperRef}
      className="w-full bg-tertiary rounded-[2rem] flex flex-col lg:flex-row items-center py-10 lg:px-20"
    >
      <div className="flex flex-col items-center lg:items-start gap-5">
        <h2
          ref={headingRef}
          className="relative text-white md:text-[5vw] md:leading-[6vw] text-[10vw] leading-[10vw] font-extrabold md:w-3/4 text-center lg:text-start overflow-hidden transition"
        >
          {headingText.split(" ").map((word, index, array) => (
            <div
              key={index}
              className="inline-block overflow-hidden px-[0.2em] m-[-0.2em]"
            >
              <span className="word inline-block overflow-hidden px-[0.2em] m-[-0.2em]">
                {word}
              </span>
              {index < array.length - 1 && <span>{"\u00A0"}</span>}
            </div>
          ))}
          <span className="pointer-events-none absolute inset-0 mix-blend-darken">
            <span className="pointer-events-none absolute inset-0 w-full h-full bg-gradient-to-br from-white to-primary"></span>
          </span>
        </h2>
        <Link
          href="*"
          ref={btnRef}
          className="hover-btn relative font-bold text-primary px-4 py-1 md:px-8 md:py-3 rounded-full bg-white  after:border-white"
        >
          Explore More
        </Link>
      </div>
      <div
        ref={imageRef}
        className="w-[70vw] md:w-[50vw] mt-10 lg:-translate-y-[30%] z-20"
      >
        <Image
          src={SafeImg}
          className="w-full h-full object-cover object-center"
          alt="Safe Image"
          priority
        />
      </div>
    </div>
  );
}
