"use client";

import Image from "next/image";
import ChartImage from "@/../public/images/chart-image.png";
import { useGSAPContext } from "@/providers/GSAPProvider";
import { useScreenSizeContext } from "@/providers/ScreenSizeProvider";
import { useRef } from "react";
import ColorenHeadingText from "../global/ColoredHeadingText";
import { useMountedContext } from "@/providers/MountContext";

export default function DataSection() {
  const { useGSAP, gsap } = useGSAPContext();
  const { deviceType } = useScreenSizeContext();
  const { isMounted } = useMountedContext();

  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // useGSAP(() => {
  //   const ctx = gsap.context(() => {
  //     gsap.killTweensOf(sectionRef.current);
  //     gsap.killTweensOf(imageRef.current);
  //     gsap.timeline().kill();
  //     // ScrollTrigger.killAll();

  //     gsap.to(".data-text", {
  //       scrollTrigger: {
  //         trigger: ".data-text",
  //         start: "top 90%",
  //         end: "bottom bottom",
  //       },
  //       opacity: 1,
  //       duration: 1,
  //       ease: "power4.out",
  //     });

  //     if (deviceType === "mobile") {
  //       gsap.to(imageRef.current, {
  //         scale: 1.5,
  //         scrollTrigger: {
  //           trigger: imageRef.current,
  //           start: "top bottom",
  //           scrub: true,
  //         },
  //       });
  //     } else {
  //       const tl = gsap.timeline({
  //         scrollTrigger: {
  //           trigger: sectionRef.current,
  //           start: "top top",
  //           end: "+=700",
  //           scrub: true,
  //           pin: true,
  //         },
  //       });
  //       tl.to(sectionRef.current, {
  //         scale: 0.9,
  //         onStart: () => sectionRef.current?.classList.add("md:rounded-[4rem]"),
  //         onReverseComplete: () =>
  //           sectionRef.current?.classList.remove("md:rounded-[4rem]"),
  //       });
  //       tl.to(
  //         imageRef.current,
  //         {
  //           scale: 1.2,
  //         },
  //         0
  //       );
  //     }
  //   });

  //   return () => ctx.revert();
  // }, [deviceType]);
  useGSAP(
    () => {
      if (isMounted) {
        gsap.to(".data-text", {
          scrollTrigger: {
            trigger: ".data-text",
            start: "top 90%",
            end: "bottom bottom",
          },
          opacity: 1,
          duration: 1,
          ease: "power4.out",
        });

        if (deviceType === "mobile") {
          gsap.to(imageRef.current, {
            scale: 1.5,
            scrollTrigger: {
              trigger: imageRef.current,
              start: "top bottom",
              scrub: true,
            },
          });
        } else {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "+=700",
              scrub: true,
              pin: true,
            },
          });
          tl.to(sectionRef.current, {
            scale: 0.9,
            onStart: () =>
              sectionRef.current?.classList.add("md:rounded-[4rem]"),
            onReverseComplete: () =>
              sectionRef.current?.classList.remove("md:rounded-[4rem]"),
          });
          tl.to(
            imageRef.current,
            {
              scale: 1.2,
            },
            0
          );
        }
      }
    },
    { dependencies: [deviceType, isMounted] }
  );
  return (
    <div
      ref={sectionRef}
      className="md:mt-40 mt-40 w-screen h-screen overflow-hidden bg-gradient-to-b from-background from-20%  dark:to-tertiary to-primary/20 md:rounded-b-[4rem]"
    >
      <div className="w-full h-full flex flex-col items-center justify-between">
        <ColorenHeadingText
          text="The Unstopable Evolution of NFT Trading"
          coloredTextIndex={1}
          filter="dark:mix-blend-darken mix-blend-lighten"
          gradient="bg-gradient-to-br from-primary to-secondary"
        />
        <div className="w-full flex lg:flex-row flex-col items-center justify-center gap-5 lg:gap-24 md:mt-10">
          <div className="data-text flex flex-col items-center opacity-0">
            <p className="font-bold md:text-[2rem]">Total Users:</p>
            <p className="text-primary font-openSans text-[9.2vw] md:text-[6vw] lg:text-[4vw]">
              4,459,000
            </p>
            <p className="md:text-xl text-sm">in the last 30 days</p>
          </div>
          <div className="data-text flex flex-col items-center opacity-0">
            <p className="font-bold md:text-[2rem]">Total Trades:</p>
            <p className="text-primary font-openSans text-[9.2vw] md:text-[6vw] lg:text-[4vw]">
              464,459,000
            </p>
            <p className="md:text-xl text-sm">in the last 30 days</p>
          </div>
          <div className="data-text flex flex-col items-center opacity-0">
            <p className="font-bold md:text-[2rem]">Total Value Locked:</p>
            <p className="text-primary font-openSans text-[9.2vw] md:text-[6vw] lg:text-[4vw]">
              $464,459,000
            </p>
          </div>
        </div>
        <div
          ref={imageRef}
          className="w-full h-1/4 md:w-2/5 md:h-1/4 lg:w-2/5 lg:h-1/3"
        >
          <Image
            src={ChartImage}
            width={760}
            height={359}
            quality={100}
            className="w-full h-full object-cover object-top"
            alt="Chart Image"
          />
        </div>
      </div>
    </div>
  );
}
