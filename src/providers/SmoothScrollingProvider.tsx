"use client";

import { ReactLenis } from "lenis/react";

export default function SmoothScrolling({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 1,
        duration: 3.5,
        smoothWheel: true,
        syncTouchLerp: 1,
        gestureOrientation: "vertical",
      }}
    >
      {children}
    </ReactLenis>
  );
}
