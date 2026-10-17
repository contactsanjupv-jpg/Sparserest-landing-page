
"use client";

import { useEffect, useRef, useState } from "react";

const chartPath =
  "M 12 142 C 28 134, 30 164, 45 151 S 66 162, 78 125 S 102 116, 118 87 S 141 102, 154 73 S 174 65, 185 90 S 207 105, 224 92 S 243 119, 258 83 S 278 98, 293 96 S 315 120, 330 142 S 350 106, 366 100";

const futurePath =
  "M 12 142 C 28 134, 30 164, 45 151 S 66 162, 78 125 S 102 116, 118 87 S 141 102, 154 73 S 174 65, 185 90 S 207 105, 224 92 S 243 119, 258 83 S 278 98, 293 96 S 315 120, 330 142 S 350 106, 366 100";

export default function PerformanceGraph() {
  const cardRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const syncMotionPreference = () => {
      setReducedMotion(motionQuery.matches);
    };

    syncMotionPreference();
    motionQuery.addEventListener("change", syncMotionPreference);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -4% 0px",
      },
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
      motionQuery.removeEventListener(
        "change",
        syncMotionPreference,
      );
    };
  }, []);

  const animate = visible && !reducedMotion;

  return (
    <section
      ref={cardRef}
      className={`performance-graph ${visible ? "is-visible" : ""}`}
      aria-label="Illustrative performance trend"
    >
      <div className="graph-frame">
        <div className="graph-card">
          <div className="graph-card-header">
            <div>
              <p className="graph-subtitle">
                SparseReST
              </p>
            </div>

            <span className="graph-status">
              <span className="graph-status-dot" />
              Overview
            </span>
          </div>

          <div className="graph-chart">
            <svg
              viewBox="0 0 380 190"
              role="img"
              aria-label="A smooth black performance curve with a subtle gray continuation"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient
                  id="performance-line-fade"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#111111" />
                  <stop
                    offset="100%"
                    stopColor="#111111"
                    stopOpacity="0.7"
                  />
                </linearGradient>

                <linearGradient
                  id="performance-area-fade"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#111111"
                    stopOpacity="0.07"
                  />
                  <stop
                    offset="100%"
                    stopColor="#111111"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              {/* Very subtle chart guides */}
              {[45, 90, 135].map((y) => (
                <line
                  key={y}
                  x1="8"
                  y1={y}
                  x2="372"
                  y2={y}
                  stroke="#eeeeec"
                  strokeWidth="1"
                />
              ))}

              {/* Soft area beneath the curve */}
              <path
                d={`${chartPath} L 366 170 L 12 170 Z`}
                fill="url(#performance-area-fade)"
                className="graph-area"
                style={{
                  transitionDelay: animate ? "180ms" : "0ms",
                }}
              />

              {/* Faint continuation behind the current point */}
              <path
                d={futurePath}
                fill="none"
                stroke="#dededb"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength="1"
                className="graph-future-line"
              />

              {/* Main animated line */}
              <path
                d={chartPath}
                fill="none"
                stroke="url(#performance-line-fade)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                pathLength="1"
                className="graph-main-line"
                style={{
                  transitionDuration: reducedMotion
                    ? "0ms"
                    : "1400ms",
                  transitionTimingFunction:
                    "cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />

              {/* Current position marker and its vertical guide */}
              <line
                x1="224"
                y1="35"
                x2="224"
                y2="166"
                stroke="#aaa9a5"
                strokeWidth="1.5"
                strokeDasharray="2 4"
                className="graph-marker-guide"
              />

              <circle
                cx="224"
                cy="92"
                r="7"
                fill="#ffffff"
                className="graph-marker-halo"
              />

              <circle
                cx="224"
                cy="92"
                r="4"
                fill="#111111"
                className="graph-marker-dot"
              />
            </svg>
          </div>

          <div className="graph-card-footer">
            <span>Consistent progress</span>
            <span className="graph-footer-mark" aria-hidden="true">
              ↗
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
