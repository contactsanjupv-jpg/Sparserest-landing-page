"use client";

import { useEffect, useState, useRef } from "react";

import Hero3D from "@/components/Hero3D";
import Intelligence3D from "@/components/Intelligence3D";

const integrations = [
  { icon: "↗", className: "icon-orange" },
  { icon: "✦", className: "icon-purple" },
  { icon: "◇", className: "icon-blue" },
  { icon: "◆", className: "icon-indigo" },
  { icon: "○", className: "icon-red" },
  { icon: "✺", className: "icon-yellow" },
  { icon: "◉", className: "icon-cyan" },
  { icon: "✦", className: "icon-pink" },
];

const capabilities = [
  {
    number: "01",
    title: "Intelligent systems",
    text: "We build technology that removes repetitive work and gives businesses more room to grow.",
  },
  {
    number: "02",
    title: "Connected workflows",
    text: "Bring your tools, data, and customer interactions together into one seamless experience.",
  },
  {
    number: "03",
    title: "Built to scale",
    text: "Flexible systems designed to evolve as your business gets bigger and more complex.",
  },
];

const testimonials = [
  {
    initials: "AM",
    name: "Alex Morgan",
    role: "Business Owner",
    text: "The difference is immediate. Our team spends less time dealing with repetitive tasks and more time actually running the business.",
    className: "testimonial-light",
    avatar: "avatar-a",
  },
  {
    initials: "SM",
    name: "Sarah Mitchell",
    role: "Marketing Director",
    text: "Everything feels connected now. The workflows are faster, cleaner, and much easier for our team to manage.",
    className: "testimonial-dark",
    avatar: "avatar-b",
  },
  {
    initials: "JD",
    name: "James Davis",
    role: "Founder",
    text: "We wanted something simple that could grow with us. The system has become a core part of how we operate.",
    className: "testimonial-warm",
    avatar: "avatar-c",
  },
];

const featureTabs = [
  { icon: "✦", label: "Intelligent systems" },
  { icon: "⌁", label: "Data & analytics" },
  { icon: "◈", label: "Automation" },
  { icon: "◇", label: "Digital experiences" },
];

export default function Home() {
  const [featureProgress, setFeatureProgress] = useState(0);
  const [testimonialProgress, setTestimonialProgress] = useState(0);

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

  // Testimonial card scroll animation
  useEffect(() => {
    let target = 0;
    let current = 0;
    let frame = 0;
    let lastTime = performance.now();

    const updateTarget = () => {
      const section = document.querySelector(".testimonials-section") as HTMLElement | null;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const start = window.innerHeight * 0.9;
      const distance = 700;

      target = Math.min(Math.max((start - rect.top) / distance, 0), 1);
    };

    const animate = (time: number) => {
      // 8D Smoothness: Frame-rate independent exponential damping
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      // 4 is the smoothing speed for testimonials (slightly floatier)
      current += (target - current) * (1 - Math.exp(-4 * delta));
      
      if (Math.abs(target - current) < 0.0005) current = target;

      setTestimonialProgress(current);
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

  // Apply the testimonial transforms directly to the DOM
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll(".testimonial-card")) as HTMLElement[];
    const [leftCard, middleCard, rightCard] = cards;

    if (leftCard && middleCard && rightCard) {
      const current = testimonialProgress;
      const shift = (1 - current) * 85;
      const scale = 0.92 + current * 0.08;
      const opacity = 0.5 + current * 0.5;
      // 8D Depth: Dynamic shadow that grows as the cards move into place
      const shadowY = 20 + current * 30;
      const shadowBlur = 30 + current * 40;

      leftCard.style.transform = `translate3d(${shift}%, 0, 0) scale(${scale})`;
      rightCard.style.transform = `translate3d(${-shift}%, 0, 0) scale(${scale})`;
      leftCard.style.opacity = `${opacity}`;
      rightCard.style.opacity = `${opacity}`;
      
      leftCard.style.boxShadow = `0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,${current * 0.08})`;
      rightCard.style.boxShadow = `0 ${shadowY}px ${shadowBlur}px rgba(0,0,0,${current * 0.08})`;
      middleCard.style.boxShadow = `0 30px 60px rgba(0,0,0,0.1)`;

      middleCard.style.transform = "translate3d(0, 0, 0) scale(1)";

      leftCard.style.zIndex = "1";
      rightCard.style.zIndex = "1";
      middleCard.style.zIndex = "3";
    }
  }, [testimonialProgress]);

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
          Contact us
          <span>→</span>
        </a>
      </nav>

      {/* HERO */}
      <section className="hero" id="about">
        <div className="hero-content">
          <div className="hero-copy">
            <span className="hero-eyebrow">TECHNOLOGY FOR MODERN BUSINESS</span>

            <h1>
              Build smarter
              <br />
              Move faster
              <br />
              Go further
            </h1>

            <p>
              We build intelligent digital systems that help ambitious businesses automate work,
              connect their operations, and create better customer experiences.
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
          <span className="section-label">WHAT WE BUILD</span>

          <h2>
            Technology that
            <br />
            works for you
          </h2>

          <p>
            We combine intelligent automation, connected systems, and thoughtful product design to
            create technology that makes businesses simpler and more powerful
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
            <span className="eyebrow">INTELLIGENT TECHNOLOGY</span>

            <h3>
              Turn complexity
              <br />
              into momentum
            </h3>

            <p>
              From automation to customer experiences, we create connected systems that take
              complicated processes and make them feel effortless
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
            <span className="section-label">CONNECT EVERYTHING</span>

            <h2>
              One system
              <br />
              Every connection
            </h2>

            <p>
              Your business already runs on dozens of tools. We connect them into a system that
              actually works together
            </p>

            

            <div className="integration-steps">
              <div className="integration-step">
                <span>01</span>
                <p>Connect your existing tools</p>
              </div>
              <div className="integration-step">
                <span>02</span>
                <p>Centralize your workflows</p>
              </div>
              <div className="integration-step">
                <span>03</span>
                <p>Automate what slows you down</p>
              </div>
            </div>
          </div>

          <div className="integration-grid">
            {integrations.map((item, index) => (
              <div className={`integration-icon ${item.className}`} key={index}>
                {item.icon}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section">
        <div className="testimonials-heading">
          <span className="section-label">CUSTOMER STORIES</span>

          <h2>
            Built around
            <br />
            real businesses
          </h2>

          <p>Technology should make business feel simpler, not more complicated</p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <article className={`testimonial-card ${testimonial.className}`} key={testimonial.name}>
              <div className="testimonial-top">
                <span className="quote">“</span>
                <span className="testimonial-rating">★★★★★</span>
              </div>

              <p className="testimonial-text">{testimonial.text}</p>

              <div className="testimonial-person">
                <div className={`person-avatar ${testimonial.avatar}`}>{testimonial.initials}</div>
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="contact">
  <div className="cta-content">
    <span className="section-label cta-label">
      LET&apos;S BUILD
    </span>

    <h2>
      Your next
      <br />
      advantage
    </h2>

    <p>
      Tell us what you are trying to build, improve, or automate. We&apos;ll
      figure out the technology with you
    </p>

    <div className="cta-buttons">
      <a
        href="mailto:contact@sparserest.com"
        className="button cta-primary"
      >
        Start a conversation
        <span>→</span>
      </a>

      <a
        href="#about"
        className="button cta-secondary"
      >
        Back to top
      </a>
    </div>
  </div>

  <div className="cta-orb orb-one" />
  <div className="cta-orb orb-two" />
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
        Building intelligent digital systems for businesses ready for what&apos;s
        next
      </p>
    </div>

    <div className="footer-links">

      <div className="footer-column">
        <span>Products</span>

        <a href="https://xflow.sparserest.com/">
          XFlow
        </a>
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
      Technology for what&apos;s next
    </span>
  </div>
</footer>
</main>
  );
}