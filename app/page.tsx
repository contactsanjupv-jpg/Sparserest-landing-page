"use client";

import { useEffect, useState } from "react";

import Hero3D from "@/components/Hero3D";
import Intelligence3D from "@/components/Intelligence3D";
import PerformanceGraph from "@/components/PerformanceGraph";
import ParticleLogo from "@/components/ParticleLogo";


const capabilities = [
  {
    number: "01",
    title: "Software products",
    text: "We create software products around clear ideas and the needs they are built to serve.",
  },
  {
    number: "02",
    title: "Connected systems",
    text: "We develop systems that allow applications, information, and processes to work together.",
  },
  {
    number: "03",
    title: "Built to evolve",
    text: "Our engineering is designed to accommodate new requirements and changing technology.",
  },
];



const featureTabs = [
  { icon: "✦", label: "Software products" },
  { icon: "⌁", label: "Data systems" },
  { icon: "◈", label: "Automation" },
  { icon: "◇", label: "Digital products" },
];

export default function Home() {
  const [featureProgress, setFeatureProgress] = useState(0);

  // Fills the bar under the feature tabs (and the text-fill effect on each
  // tab label) as that section scrolls into view.
  useEffect(() => {
    let target = 0;
    let current = 0;
    let frame = 0;
    let lastTime = performance.now();

    const updateTarget = () => {
      const section = document.querySelector(".feature-tabs") as HTMLElement | null;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const start = window.innerHeight * 0.85;
      const distance = 500;

      target = Math.min(Math.max((start - rect.top) / distance, 0), 1);
    };

    const animate = (time: number) => {
      // 8D Smoothness: Frame-rate independent exponential damping
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // 6 is the smoothing speed (higher = snappier, lower = floatier)
      current += (target - current) * (1 - Math.exp(-6 * delta));
      
      if (Math.abs(target - current) < 0.0005) current = target;

      setFeatureProgress(current);
      frame = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", updateTarget, { passive: true });
    updateTarget();
    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", updateTarget);
      cancelAnimationFrame(frame);
    };
  }, []);

  // 8D Floating CTA Orbs
  useEffect(() => {
    const orbOne = document.querySelector(".orb-one") as HTMLElement;
    const orbTwo = document.querySelector(".orb-two") as HTMLElement;
    if (!orbOne || !orbTwo) return;

    let frame = 0;
    const animateOrbs = (time: number) => {
      const t = time * 0.001;
      
      // Gentle 8D floating motion
      orbOne.style.transform = `translate3d(${Math.sin(t * 0.8) * 15}px, ${Math.cos(t * 0.5) * 20}px, 0) scale(${1 + Math.sin(t * 0.3) * 0.05})`;
      orbTwo.style.transform = `translate3d(${Math.cos(t * 0.6) * 20}px, ${Math.sin(t * 0.7) * 15}px, 0) scale(${1 + Math.cos(t * 0.4) * 0.05})`;
      
      frame = requestAnimationFrame(animateOrbs);
    };

    frame = requestAnimationFrame(animateOrbs);
    return () => cancelAnimationFrame(frame);
  }, []);

  // Converts the global 0 -> 1 scroll progress into a per-tab 0 -> 1 value
  const getTabProgress = (index: number) => {
    const tabStart = index / featureTabs.length;
    const tabEnd = (index + 1) / featureTabs.length;
    return Math.min(Math.max((featureProgress - tabStart) / (tabEnd - tabStart), 0), 1);
  };

  return (
    <main className="site">
      {/* NAVBAR */}
      <nav className="navbar">
        <a href="/about" className="logo">
          <img src="/logo.png" alt="SparseReST logo" className="logo-image" />
        </a>

        <div className="nav-links">
          <a href="/about">About</a>
          <a href="/terms">Terms</a>
          <a href="/privacy">Privacy</a>
        </div>

        <a href="mailto:contact@sparserest.com" className="nav-button">
          Contact
          <span>→</span>
        </a>
      </nav>

      {/* HERO */}
      <section className="hero" id="about">
        <div className="hero-content">
          <div className="hero-copy">
            <span className="hero-eyebrow">SOFTWARE AND TECHNOLOGY</span>

            <h1>
              Ideas into
              <br />
              working
              <br />
              software
            </h1>

            <p>
              SparseReST is an independent technology company creating software products and digital systems.
            </p>

            
          </div>

          <div className="hero-visual">
            <Hero3D />
          </div>
        </div>

      </section>

      {/* FEATURES */}
      <section className="performance-section" id="features">
        <div className="performance-heading">
          <span className="section-label">THE WORK</span>

          <h2>
            Technology,
            <br />
            put to work
          </h2>

          <p>
            Our work spans software products, connected systems, and digital tools built for specific uses.
          </p>
        </div>

        {/* FEATURE TABS */}
        <div className="feature-tabs">
          <div className="feature-scroll-fill" style={{ width: `${featureProgress * 100}%` }} />

          {featureTabs.map((tab, index) => {
            const progress = getTabProgress(index);
            return (
              <div className="feature-tab" key={tab.label}>
                <span style={{ color: progress > 0 ? "#111111" : "#9b9690" }}>{tab.icon}</span>
                <span
                  style={{
                    backgroundImage: `linear-gradient(to right, #111111 0%, #111111 ${
                      progress * 100
                    }%, #9b9690 ${progress * 100}%, #9b9690 100%)`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    // 8D Glow: The text emits light as the bar passes over it
                    filter: `drop-shadow(0 0 ${progress * 8}px rgba(17, 17, 17, ${progress * 0.4}))`,
                    transition: "filter 0.1s ease-out",
                  }}
                >
                  {tab.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* EARTH + COPY SHOWCASE */}
        <div className="feature-showcase">
          <div className="showcase-visual">
            <Intelligence3D />
          </div>

          <div className="showcase-copy">
            <span className="eyebrow">SOFTWARE IN PRACTICE</span>

            <h3>
              From idea
              <br />
              to application
            </h3>

            <p>
              We focus on the details that make software useful: how it works, how it fits together, and how people use it.
            </p>

            <div className="capability-list">
              {capabilities.map((item) => (
                <div className="capability" key={item.number}>
                  <span className="capability-number">{item.number}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="integrations-section" id="integrations">
        <div className="integrations-content">
          <div className="integrations-copy">
            <span className="section-label">CONNECTED BY DESIGN</span>

            <h2>
              Technology
              <br />
              works together
            </h2>

            <p>
              Software depends on the systems around it. We design for the connections between applications, information, and tools.
            </p>

            

            <div className="integration-steps">
              <div className="integration-step">
                <span>01</span>
                <p>Connect the pieces</p>
              </div>
              <div className="integration-step">
                <span>02</span>
                <p>Bring information together</p>
              </div>
              <div className="integration-step">
                <span>03</span>
                <p>Make systems work together</p>
              </div>
            </div>
          </div>

      <div className="integration-grid integration-particle-grid">
            <ParticleLogo imageUrl="/logo.png" />
          </div>
        </div>
      </section>

      
{/* CTA / PERFORMANCE GRAPH */}
<section className="bottom-performance-section" id="contact">
  <div className="bottom-performance-inner">
    <div className="performance-intro-copy">
      <span className="section-label">ENGINEERED FOR USE</span>

      <h2>
        Thoughtful engineering.
        <br />
        Useful technology.
        <br />
        Built to evolve.
      </h2>

      <p>
        Every detail matters: how a system is designed, how its parts work together, and how well it serves its purpose over time.
      </p>

      <a href="mailto:contact@sparserest.com" className="button cta-primary">
        Contact SparseReST
        <span aria-hidden="true">→</span>
      </a>
    </div>

    <PerformanceGraph />
  </div>
</section>


{/* FOOTER */}

<footer className="footer">
  <div className="footer-top">

    <div className="footer-brand">
      <a href="#about" className="logo">
        <img
          src="/logo.png"
          alt="SparseReST logo"
          className="logo-image"
        />
      </a>

      <p>
        An independent technology company creating software products and digital systems.
      </p>
    </div>

    <div className="footer-links">

      <div className="footer-column">
        <span>Products</span>

      
      </div>

      <div className="footer-column">
        <span>Company</span>

        <a href="mailto:contact@sparserest.com">
          Contact
        </a>

        <a href="/privacy">
          Privacy
        </a>

        <a href="/terms">
          Terms
        </a>

        <a href="/about">
          About
        </a>
      </div>

      <div className="footer-column">
        <span>Social</span>

        <a href="https://www.instagram.com/sparserest?dlrf=NGx1bTZuNTdyb2Fj&utm_source=qr">
          Instagram
        </a>

        <a href="https://www.linkedin.com/in/sanju-p-v-a24151414?utm_source=share_via&utm_content=profile&utm_medium=member_ios">
          LinkedIn
        </a>

        <a href="https://x.com/sanju74209618?s=21">
          X
        </a>
      </div>

    </div>
  </div>

  <div className="footer-bottom">
    <span>
      © 2026 SparseReST. All rights reserved
    </span>

    <span>
      SparseReST
    </span>
  </div>
</footer>
</main>
  );
}