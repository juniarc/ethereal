"use client";

import FeatureItem from "./FeatureItem";
import { useGSAPContext } from "@/providers/GSAPProvider";
import { useRef } from "react";
import ColorenHeadingText from "../global/ColoredHeadingText";
import { MdOutlineLock, MdOutlineRocketLaunch } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";
import { useScreenSizeContext } from "@/providers/ScreenSizeProvider";

const featuresData = [
  {
    id: 1,
    title: "Secure",
    description:
      "Our platform is built on blockchain technology, ensuring that every transaction is transparent, safe, and decentralized. Enjoy true ownership of your digital assets, with full control and peace of mind.",
    icon: (
      <MdOutlineLock className="text-foreground size-24 group-hover:text-primary/70 transition-colors ease-in duration-300" />
    ),
  },
  {
    id: 2,
    title: "Exclusive",
    description:
      "Gain access to a curated collection of rare and high-quality NFTs, featuring work from top artists and emerging creators. Our marketplace is designed to connect collectors with one-of-a-kind digital assets you won't find anywhere else.",
    icon: (
      <FaRegStar className="text-foreground size-24 group-hover:text-primary/70 transition-colors ease-in duration-300" />
    ),
  },
  {
    id: 3,
    title: "Efficient",
    description:
      "Experience the future of NFT trading with minimal fees and lightning-fast transactions. Our platform is optimized for seamless performance, so you can buy, sell, and trade with ease, without waiting for slow confirmations or dealing with high costs.",
    icon: (
      <MdOutlineRocketLaunch className="text-foreground size-24 group-hover:text-primary/70 transition-colors ease-in duration-300" />
    ),
  },
  {
    id: 4,
    title: "Global",
    description:
      "Join a worldwide community of creators and collectors, engaging in a truly global marketplace where digital art and collectibles are accessible to everyone, no matter where you are.",
    icon: (
      <TfiWorld className="text-foreground size-24 group-hover:text-primary/70 transition-colors ease-in duration-300" />
    ),
  },
];

export default function FeaturesSection() {
  const { useGSAP, gsap, ScrollTrigger } = useGSAPContext();
  const { screenSize } = useScreenSizeContext();

  const headingRef = useRef<HTMLHeadingElement>(null);
  const featuresWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const words = headingRef.current?.querySelectorAll(".word");

      if (words) {
        gsap.from(words, {
          translateY: "100%",
          duration: 1.5,
          ease: "power4.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        });
      }

      gsap.from(featuresWrapperRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: featuresWrapperRef.current,
          start: "top 80%",
        },
      });

      ScrollTrigger.create({
        trigger: ".features-section",
        start: "bottom bottom",
        endTrigger: ".community-section",
        end: "top top",
        pin: true,
        pinSpacing: false,
      });
    },
    { dependencies: [screenSize], revertOnUpdate: true }
  );
  return (
    <div className="test lg:my-40 my-20 flex flex-col items-center relative ">
      <ColorenHeadingText
        text="Explore Unique Digital Assets Like Never Before"
        coloredTextIndex={1}
        filter="dark:mix-blend-hard-light mix-blend-soft-light"
        gradient="bg-gradient-to-br from-pink to-purple"
        coloredTextClassname="text-white"
      />
      <section
        ref={featuresWrapperRef}
        className="grid md:grid-cols-2 mt-10 md:mt-20 gap-5 lg:gap-16 px-10"
      >
        {featuresData.map((item) => (
          <FeatureItem key={item.id} {...item} />
        ))}
      </section>
    </div>
  );
}
