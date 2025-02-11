"use client";
import { useGSAPContext } from "@/providers/GSAPProvider";
import { useMountedContext } from "@/providers/MountContext";
import { useScreenSizeContext } from "@/providers/ScreenSizeProvider";
import { useEffect, useRef } from "react";

export default function GradientBg({
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  size = 200,
  blendingValue = "soft-light",
  containerClassName,
}: {
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  size?: number;
  blendingValue?: string;
  containerClassName?: string;
}) {
  const { isMounted } = useMountedContext();
  const { screenSize } = useScreenSizeContext();
  const { useGSAP, ScrollTrigger } = useGSAPContext();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const blobs = [
      {
        x: width * 0.3,
        y: height * 0.3,
        color: firstColor,
        dx: 0.3,
        dy: 0.5,
        size: Math.random() * (size * 0.7) + size * 0.3,
      },
      {
        x: width * 0.6,
        y: height * 0.6,
        color: secondColor,
        dx: -0.4,
        dy: 0.3,
        size: Math.random() * (size * 0.7) + size * 0.7,
      },
      {
        x: width * 0.4,
        y: height * 0.7,
        color: thirdColor,
        dx: 0.5,
        dy: -0.4,
        size: Math.random() * (size * 0.7) + size * 0.5,
      },
      {
        x: width * 0.7,
        y: height * 0.4,
        color: fourthColor,
        dx: -0.6,
        dy: -0.5,
        size: Math.random() * (size * 0.7) + size * 1,
      },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter"; // Blend the colors

      blobs.forEach((blob) => {
        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          blob.x,
          blob.y,
          0,
          blob.x,
          blob.y,
          blob.size
        );
        gradient.addColorStop(0, `rgba(${blob.color}, 0.8)`);
        gradient.addColorStop(1, `rgba(${blob.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.arc(blob.x, blob.y, blob.size, 0, Math.PI * 2);
        ctx.fill();

        blob.x += blob.dx;
        blob.y += blob.dy;

        if (blob.x - blob.size < 0 || blob.x + size > width) blob.dx *= -1;
        if (blob.y - blob.size < 0 || blob.y + size > height) blob.dy *= -1;
        blob.size += Math.sin(Date.now() * 0.001 + blob.x) * 0.5;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      requestRef.current && cancelAnimationFrame(requestRef.current);
    };
  }, [firstColor, secondColor, thirdColor, fourthColor, size, blendingValue]);

  useGSAP(
    () => {
      if (isMounted) {
        ScrollTrigger.create({
          trigger: wrapperRef.current,
          start: "top top",
          endTrigger: ".community-section",
          end: "bottom bottom",
          pin: true,
          scrub: true,
          pinSpacing: false,
        });
      }
    },
    { dependencies: [isMounted, screenSize], revertOnUpdate: true }
  );

  return (
    <div
      ref={wrapperRef}
      className={`absolute -z-50 w-screen h-screen overflow-hidden opacity-30 ${containerClassName}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-100 blur-xl"
      ></canvas>
    </div>
  );
}
