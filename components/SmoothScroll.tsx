
"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

export default function SmoothScroll({
  children,
}: {
  children: ReactNode;
}) {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => setReducedMotion(media.matches);

    update();
    setReady(true);
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  if (!ready || reducedMotion) {
    return <>{children}</>;
  }

  return <>{children}</>;}
