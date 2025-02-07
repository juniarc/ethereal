"use client";

import { useGSAPContext } from "@/providers/GSAPProvider";
import { IconType } from "react-icons";
import { FaEthereum } from "react-icons/fa";
import { SiPolygon, SiBnbchain } from "react-icons/si";
import AptosIcon from "@/../public/icons/aptos-icon.svg";
import BaseIcon from "@/../public/icons/base-icon.svg";
import LineaIcon from "@/../public/icons/linea-icon.svg";
import Image from "next/image";
import { useRef } from "react";

interface BlockchainDataTypes {
  id: number;
  name: string;
  icon?: IconType;
  src?: string;
  type: "react" | "src";
  bgColor: string;
  color: string;
}

const dummyData: BlockchainDataTypes[] = [
  {
    id: 1,
    name: "Ethereum",
    icon: FaEthereum,
    bgColor: "#798CE9",
    color: "#1E1E1E",
    type: "react",
  },
  {
    id: 2,
    name: "Aptos",
    src: AptosIcon,
    type: "src",
    color: "#000000",
    bgColor: "#7BDBAC",
  },
  {
    id: 3,
    name: "Polygon zkEVM",
    icon: SiPolygon,
    type: "react",
    color: "#000000",
    bgColor: "#E565A6",
  },
  {
    id: 4,
    name: "Base",
    type: "src",
    src: BaseIcon,
    color: "#000000",
    bgColor: "#5AACF9",
  },
  {
    id: 5,
    name: "Linea",
    type: "src",
    src: LineaIcon,
    color: "#000000",
    bgColor: "#FFFFFF",
  },
  {
    id: 6,
    name: "BNB Chain",
    type: "react",
    icon: SiBnbchain,
    color: "#1E1E1E",
    bgColor: "#F5C449",
  },
  {
    id: 7,
    name: "opBNB Chain",
    type: "react",
    icon: SiBnbchain,
    color: "#F5C449",
    bgColor: "#1E1E1E",
  },
];

export default function InfiniteElement() {
  const { gsap, useGSAP } = useGSAPContext();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const secondGroupRef = useRef<HTMLDivElement>(null);

  let xPercent = -100;
  const direction = 1;
  let animationFrameId: number | null = null;

  const animation = () => {
    if (xPercent > 0) {
      xPercent = -100;
    } else if (xPercent < -100) {
      xPercent = 0;
    }

    gsap.set(firstGroupRef.current, {
      xPercent: xPercent,
    });
    gsap.set(secondGroupRef.current, {
      xPercent: xPercent,
    });

    xPercent += 0.05 * direction;

    animationFrameId = requestAnimationFrame(animation);
  };

  useGSAP(
    () => {
      gsap.from(wrapperRef.current, {
        opacity: 0,
        duration: 3,
        delay: 1,
        ease: "power4.out",
      });
      animationFrameId = requestAnimationFrame(animation);

      return () => {
        if (animationFrameId !== null) cancelAnimationFrame(animationFrameId);
      };
    },
    { dependencies: [] }
  );

  return (
    <div className="absolute bottom-0 w-screen md:w-4/5 overflow-hidden">
      <div ref={wrapperRef} className="flex items-center wrapper-mask">
        <div
          ref={firstGroupRef}
          className="flex flex-grow items-center gap-3 min-w-fit pr-[60px]"
        >
          {dummyData.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 min-w-fit flex-nowrap px-5 py-2 rounded-full"
              style={{ backgroundColor: item.bgColor }}
            >
              {item.type === "react" && item.icon ? (
                <>
                  <item.icon size={16} style={{ color: item.color }} />
                  <p
                    className="text-nowrap font-bold"
                    style={{ color: item.color }}
                  >
                    {item.name}
                  </p>
                </>
              ) : (
                item.src && (
                  <>
                    <Image src={item.src} width={16} height={16} alt="icon" />
                    <p
                      className="text-nowrap font-bold"
                      style={{ color: item.color }}
                    >
                      {item.name}
                    </p>
                  </>
                )
              )}
            </div>
          ))}
        </div>
        <div
          ref={secondGroupRef}
          className="flex items-center flex-nowrap gap-3 min-w-fit pr-[60px]"
        >
          {dummyData.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 min-w-fit h-fit flex-nowrap px-5 py-2 rounded-full"
              style={{ backgroundColor: item.bgColor }}
            >
              {item.type === "react" && item.icon ? (
                <>
                  <item.icon size={16} style={{ color: item.color }} />
                  <p
                    className="text-nowrap font-bold"
                    style={{ color: item.color }}
                  >
                    {item.name}
                  </p>
                </>
              ) : (
                item.src && (
                  <>
                    <Image src={item.src} width={16} height={16} alt="icon" />
                    <p
                      className="text-nowrap font-bold"
                      style={{ color: item.color }}
                    >
                      {item.name}
                    </p>
                  </>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
