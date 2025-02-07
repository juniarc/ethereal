"use client";

import Image from "next/image";
import HeroBg from "@/../public/images/hero-bg.png";
import HeroBgDesktop from "@/../public/images/hero-bg-desktop.png";
import { useScreenSizeContext } from "@/providers/ScreenSizeProvider";
import { useGSAPContext } from "@/providers/GSAPProvider";
import { useRef } from "react";
import InfiniteElement from "./InfiniteElement";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useMountedContext } from "@/providers/MountContext";
import Link from "next/link";

export default function HeroSection() {
  const { deviceType } = useScreenSizeContext();
  const { useGSAP, gsap } = useGSAPContext();
  const { isMounted } = useMountedContext();

  const bgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const overlayRef = useRef<HTMLSpanElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const exploreRef = useRef<HTMLAnchorElement>(null);

  const headingText = "Unlock the Future of Digital Collectibles";

  useGSAP(
    () => {
      const words = headingRef.current?.querySelectorAll(".word");

      if (isMounted) {
        gsap.from(bgRef.current, {
          opacity: 0,
          duration: 3,
          ease: "power3.inOut",
          delay: 0.5,
        });

        const tl = gsap.timeline();

        if (words) {
          tl.from(words, {
            translateY: "100%",
            duration: 1.5,
            ease: "power4.out",
            stagger: 0.05,
          }).from(overlayRef.current, {
            opacity: 0,
            duration: 1,
            ease: "power1.out",
          });
        }
        tl.from(
          subHeadingRef.current,
          {
            opacity: 0,
            translateY: "100%",
            ease: "power4.out",
            duration: 1,
          },
          0.5
        );
        tl.from(
          btnRef.current,
          {
            opacity: 0,
            translateY: "100%",
            ease: "power4.out",
            duration: 1,
          },
          0.5
        );
        tl.from(
          exploreRef.current,
          {
            opacity: 0,
            translateY: "100%",
            ease: "power4.out",
            duration: 1,
          },
          0.5
        );
      }
    },
    { dependencies: [isMounted] }
  );

  if (!isMounted) return;
  return (
    <div className="relative flex justify-center">
      <div
        ref={bgRef}
        className="w-screen h-screen absolute top-0 left-0 pointer-events-none"
      >
        <Image
          src={deviceType === "mobile" ? HeroBg : HeroBgDesktop}
          className="mask-image w-full h-full object-cover object-center opacity-15 pointer-events-none"
          width={deviceType === "mobile" ? 768 : 1920}
          height={deviceType === "mobile" ? 1024 : 1080}
          quality={100}
          priority={true}
          alt="Hero Background"
        />
      </div>
      <div className="w-full md:w-3/5 h-screen relative flex justify-center items-center px-4">
        <div className="flex flex-col items-center gap-5 md:gap-10">
          <h1
            ref={headingRef}
            className="relative font-extrabold text-[10vw] leading-[10vw] w-3/4 md:w-auto md:text-[5vw] md:leading-[5vw] text-center overflow-hidden transition"
          >
            {headingText.split(" ").map((word, index, array) => (
              <div
                key={index}
                className="inline-block overflow-hidden p-[0.2em] m-[-0.2em]"
              >
                <span className="word inline-block overflow-hidden p-[0.2em] m-[-0.2em]">
                  {word}
                </span>
                {index < array.length - 1 && <span>{"\u00A0"}</span>}
              </div>
            ))}
            <span className="pointer-events-none absolute inset-0 dark:mix-blend-darken mix-blend-lighten">
              <span
                ref={overlayRef}
                className="pointer-events-none absolute inset-0 w-full h-full bg-gradient-to-br from-foreground to-secondary"
              ></span>
            </span>
          </h1>
          <p ref={subHeadingRef} className="text-center lg:text-2xl">
            Discover, Trade, and Own Exclusive NFTs in a Seamless Web3
            Experience.
          </p>
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === "authenticated");
              if (!connected) {
                return (
                  <button
                    className="hover-btn relative font-bold text-white px-4 py-1 md:px-8 md:py-3 rounded-full bg-gradient-to-br from-secondary to-primary"
                    onClick={openConnectModal}
                    type="button"
                    ref={btnRef}
                  >
                    Connect Wallet
                  </button>
                );
              } else {
                return (
                  <Link
                    href="*"
                    ref={exploreRef}
                    className="hover-btn relative font-bold text-white px-4 py-1 md:px-8 md:py-3 rounded-full bg-gradient-to-br from-secondary to-primary"
                  >
                    Explore More
                  </Link>
                );
              }
            }}
          </ConnectButton.Custom>
        </div>
        <InfiniteElement />
      </div>
    </div>
  );
}
