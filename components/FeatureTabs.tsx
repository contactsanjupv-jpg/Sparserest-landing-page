"use client";

import { useEffect } from "react";

export default function FeatureTabs() {
  useEffect(() => {
    const tabs = document.querySelector(
      ".feature-tabs"
    ) as HTMLElement | null;

    if (!tabs) return;

    let targetProgress = 0;
    let currentProgress = 0;
    let animationFrame = 0;
    let lastTime = performance.now();

    const updateTarget = () => {
      const rect = tabs.getBoundingClientRect();

      const start = window.innerHeight * 0.9;
      const distance = 700;

      targetProgress = Math.min(
        Math.max(
          (start - rect.top) / distance,
          0
        ),
        1
      );
    };

    const animate = (time: number) => {
      // 8D Smoothness: Calculate delta time (in seconds)
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // Frame-rate independent exponential smoothing.
      // This replaces the rigid `* 0.12` multiplier. It guarantees buttery
      // smooth motion on 60Hz, 120Hz, and 240Hz screens alike.
      const smoothing = 1 - Math.exp(-8 * delta);
      currentProgress += (targetProgress - currentProgress) * smoothing;

      // Snap to target if we're close enough to prevent infinite tiny updates
      if (Math.abs(targetProgress - currentProgress) < 0.0005) {
        currentProgress = targetProgress;
      }

      // BAR
      const fill = tabs.querySelector(
        ".feature-scroll-fill"
      ) as HTMLElement | null;

      if (fill) {
        fill.style.width = `${currentProgress * 100}%`;
        // 8D Glow: The bar glows brighter as it fills
        fill.style.setProperty("--bar-glow", currentProgress.toString());
      }

      // TEXT
      const textElements = tabs.querySelectorAll(
        ".feature-tab-text"
      );

      textElements.forEach((text, index) => {
        const startPoint = index / 4;
        const endPoint = (index + 1) / 4;

        const localProgress = Math.min(
          Math.max(
            (currentProgress - startPoint) / (endPoint - startPoint),
            0
          ),
          1
        );

        const el = text as HTMLElement;
        el.style.setProperty("--tab-fill", `${localProgress * 100}%`);
        
        // 8D Glow: Pass the progress (0 to 1) to CSS so it can add a
        // volumetric shadow/glow to the text as it fills.
        el.style.setProperty("--tab-glow", localProgress.toString());
      });

      animationFrame = requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      updateTarget();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    updateTarget();
    animationFrame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return null;
}