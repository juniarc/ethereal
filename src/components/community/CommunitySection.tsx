"use client";

import { useGSAPContext } from "@/providers/GSAPProvider";
import { useRef } from "react";
import ColorenHeadingText from "../global/ColoredHeadingText";
import { RotatedDevice } from "./RotatedDevice";
import Image from "next/image";
import ExampleImg from "@/../public/images/community-image.webp";
import Link from "next/link";
import { FaInstagram, FaTiktok, FaXTwitter, FaYoutube } from "react-icons/fa6";
import { useTheme } from "next-themes";
import { useMountedContext } from "@/providers/MountContext";
import { useScreenSizeContext } from "@/providers/ScreenSizeProvider";

export default function CommunitySection() {
  const { isMounted } = useMountedContext();
  const { gsap, useGSAP } = useGSAPContext();
  const { theme } = useTheme();
  const { screenSize } = useScreenSizeContext();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const subHeadingRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (isMounted) {
        gsap.from(subHeadingRef.current, {
          opacity: 0,
          translateY: "100%",
          ease: "power4.out",
          duration: 1,
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "10% bottom",
          },
        });
      }
    },
    { dependencies: [screenSize], revertOnUpdate: true }
  );

  if (!isMounted) return;
  return (
    <div ref={wrapperRef} className="w-fit h-fit bg-background">
      <section
        className={`px-10 w-screen rounded-t-[2rem] flex flex-col items-center ${
          theme === "dark"
            ? "bg-gradient-to-bl from-secondary to-60% to-background community-bg-mask"
            : "bg-primary community-bg-mask"
        }`}
      >
        <ColorenHeadingText
          classname="pt-10 text-white"
          text="Join Our Community"
          gradient={`${
            theme === "dark" && "bg-gradient-to-br from-foreground to-secondary"
          }`}
          coloredTextIndex={2}
          filter="dark:mix-blend-darken"
          start="top bottom"
          coloredTextClassname={`${theme !== "dark" && "text-tertiary"}`}
        />
        <p
          ref={subHeadingRef}
          className="text-white text-center mt-5 lg:mt-0 font-extralight lg:text-2xl md:w-3/4 lg:w-1/2 "
        >
          Be part of a vibrant, global network of artists, collectors, and
          innovators. Connect, share, and grow within the world of NFTs, where
          creativity knows no bounds.
        </p>
        <ul className="font-bold flex items-center gap-10 text-xl md:text-2xl mt-10 lg:mt-20">
          <li className="dark:bg-primary bg-white group hover:bg-foreground transition-colors p-3 rounded-full">
            <Link href="*">
              <FaTiktok className="dark:text-foreground group-hover:text-primary transition-colors " />
            </Link>
          </li>
          <li className="dark:bg-primary bg-white group hover:bg-foreground transition-colors p-3 rounded-full">
            <Link href="*">
              <FaInstagram className="text-foreground group-hover:text-primary transition-colors" />
            </Link>
          </li>
          <li className="dark:bg-primary bg-white group hover:bg-foreground transition-colors p-3 rounded-full">
            <Link href="*">
              <FaXTwitter className="text-foreground group-hover:text-primary transition-colors" />
            </Link>
          </li>
          <li className="dark:bg-primary bg-white group hover:bg-foreground transition-colors p-3 rounded-full">
            <Link href="*">
              <FaYoutube className="text-foreground group-hover:text-primary transition-colors" />
            </Link>
          </li>
        </ul>
        <RotatedDevice>
          <Image
            src={ExampleImg}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-center"
            draggable={false}
          />
        </RotatedDevice>
      </section>
    </div>
  );
}
