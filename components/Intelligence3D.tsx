"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";

const EARTH_COUNT = 12000;
const TRAIL_COUNT = 4500;

// How gently the blast eases toward the current scroll position every frame.
// Lower = slower and smoother (the animation trails the scroll instead of
// snapping straight to it), higher = snappier/more immediate.
const SCROLL_SMOOTHING = 0.045;

// The blast now unfolds across almost the whole scroll range instead of a
// narrow 0.30–0.78 window, so it can't feel like it "pops" partway through.
const EARTH_BLAST_START = 0.12;
const EARTH_BLAST_END = 0.95;
const FLOW_START = 0.25;
const FLOW_END = 1;

// Slow continuous spin speeds, in radians/second.
const EARTH_SPIN_SPEED = 0.06;
const FLOW_SPIN_SPEED = 0.02;

type EarthParticleData = {
  geometry: THREE.BufferGeometry;
  original: Float32Array;
  exploded: Float32Array;
  random: Float32Array;
  earthX: number;
  earthY: number;
};

function getScrollProgress() {
  const section = document.querySelector(".feature-showcase") as HTMLElement | null;
  if (!section) return 0;

  const rect = section.getBoundingClientRect();
  const viewport = window.innerHeight;

  // Both ranges are roughly double the original distance, so it now takes
  // much more scrolling to go from an intact globe to a full blast.
  if (window.innerWidth > 650) {
    const start = viewport * 1.1;
    const end = -viewport * 0.9;
    const progress = (start - rect.top) / (start - end);
    return THREE.MathUtils.clamp(progress, 0, 1);
  }

  const start = viewport * 0.5;
  const end = -viewport * 1.1;
  const progress = (start - rect.top) / (start - end);
  return THREE.MathUtils.clamp(progress, 0, 1);
}

/* =========================================================
   EARTH PARTICLES
   ========================================================= */

function EarthParticles() {
  const groupRef = useRef<THREE.Group | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const smoothScroll = useRef(0);

  const data = useMemo<EarthParticleData>(() => {
    const geometry = new THREE.BufferGeometry();
    const original = new Float32Array(EARTH_COUNT * 3);
    const exploded = new Float32Array(EARTH_COUNT * 3);
    const random = new Float32Array(EARTH_COUNT);

    // Fixed position. Desktop stays exactly where it was; mobile moves right
    // and down. Now applied as the mesh's own position (see the JSX below)
    // instead of being baked into every vertex, so the globe can spin around
    // its own center instead of orbiting the scene origin.
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 650;
    const earthX = isMobile ? 1 : -1.05;
    const earthY = isMobile ? -2.6 : 0;
    const radius = isMobile ? 1.2 : 1.72;

    for (let i = 0; i < EARTH_COUNT; i++) {
      const i3 = i * 3;
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));
      const y = 1 - (i / (EARTH_COUNT - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      const surfaceNoise = 0.97 + Math.random() * 0.06;

      const x = Math.cos(theta) * radiusAtY * radius * surfaceNoise;
      const yy = y * radius * surfaceNoise;
      const z = Math.sin(theta) * radiusAtY * radius * surfaceNoise;

      // Starting globe position (local, centered on the object's own origin).
      original[i3] = x;
      original[i3 + 1] = yy;
      original[i3 + 2] = z;

      // Explosion direction.
      const normal = new THREE.Vector3(x, yy, z).normalize();
      const r = Math.random();
      random[i] = r;

      const distance = 1.2 + Math.pow(r, 0.72) * 5.4;
      const horizontal = 0.85 + Math.random() * 1.35;
      const curl = new THREE.Vector3(-normal.z, normal.x * 0.35, normal.y)
        .normalize()
        .multiplyScalar((Math.random() - 0.5) * 0.85);

      exploded[i3] = x + normal.x * distance * horizontal + curl.x;
      exploded[i3 + 1] = yy + normal.y * distance * 0.9 + curl.y;
      exploded[i3 + 2] = z + normal.z * distance * 0.72 + curl.z;
    }

    // Start as a globe.
    geometry.setAttribute("position", new THREE.BufferAttribute(original.slice(), 3));

    return { geometry, original, exploded, random, earthX, earthY };
  }, []);

  useEffect(() => {
    return () => {
      data.geometry.dispose();
    };
  }, [data]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    const points = pointsRef.current;
    if (!points || !group) return;

    const position = points.geometry.getAttribute("position") as THREE.BufferAttribute;
    const array = position.array as Float32Array;
    const time = state.clock.elapsedTime;

    // Ease the raw scroll value toward its target every frame.
    // Using MathUtils.damp makes this completely frame-rate independent,
    // guaranteeing buttery smooth motion on any monitor (60Hz, 144Hz, etc.)
    const target = getScrollProgress();
    smoothScroll.current = THREE.MathUtils.damp(
      smoothScroll.current,
      target,
      4.5, // Damping factor (roughly equivalent to 0.045 at 60fps)
      delta
    );
    const scroll = smoothScroll.current;

    const rawBlast = THREE.MathUtils.smoothstep(scroll, EARTH_BLAST_START, EARTH_BLAST_END);
    const blast = rawBlast * rawBlast * (3 - 2 * rawBlast);

    for (let i = 0; i < EARTH_COUNT; i++) {
      const i3 = i * 3;
      const r = data.random[i];

      const local = THREE.MathUtils.clamp((blast - r * 0.13) / 0.87, 0, 1);
      const eased = local * local * (3 - 2 * local);

      let x = THREE.MathUtils.lerp(data.original[i3], data.exploded[i3], eased);
      let y = THREE.MathUtils.lerp(data.original[i3 + 1], data.exploded[i3 + 1], eased);
      let z = THREE.MathUtils.lerp(data.original[i3 + 2], data.exploded[i3 + 2], eased);

      // Tiny breathing motion while the globe is still together.
      const breathing = Math.sin(time * 0.7 + r * 20) * 0.006 * (1 - eased);
      x += breathing;
      y += Math.cos(time * 0.75 + r * 16) * 0.005 * (1 - eased);

      // Very subtle particle life during the blast. This does not move the
      // globe left or right as a whole.
      const flow = time * 0.45 + r * 15;
      x += Math.sin(flow) * 0.035 * eased;
      y += Math.cos(flow * 0.83) * 0.025 * eased;
      z += Math.sin(flow * 0.67) * 0.025 * eased;

      array[i3] = x;
      array[i3 + 1] = y;
      array[i3 + 2] = z;
    }

    position.needsUpdate = true;

    // Slow, continuous rotation — eases off a little once fully exploded so
    // the debris field doesn't keep spinning at full globe-speed forever.
    const spinSpeed = EARTH_SPIN_SPEED * (1 - blast * 0.4);
    group.rotation.y += spinSpeed * delta;
    group.rotation.x = 0.12 + Math.sin(time * 0.12) * 0.04;

    // A gentle dolly-out as the blast unfolds adds a sense of scale and depth.
    state.camera.position.z = THREE.MathUtils.lerp(7.2, 7.9, blast);
  });

  return (
    <group ref={groupRef} position={[data.earthX, data.earthY, 0]}>
      {/* Glow Layer (The Halo) - Creates the 8D volumetric glow */}
      <points geometry={data.geometry} frustumCulled={false}>
        <pointsMaterial
          color="#20201f"
          size={0.042}
          transparent
          opacity={0.12}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
      
      {/* Core Layer (The crisp stars) - Unchanged size and opacity */}
      <points ref={pointsRef} geometry={data.geometry} frustumCulled={false}>
        <pointsMaterial
          color="#20201f"
          size={0.014}
          transparent
          opacity={0.72}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
    </group>
  );
}

/* =========================================================
   OUTER FLOW PARTICLES
   ========================================================= */

function FlowParticles() {
  const groupRef = useRef<THREE.Group | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const smoothScroll = useRef(0);

  const data = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(TRAIL_COUNT * 3);
    const seeds = new Float32Array(TRAIL_COUNT);

    for (let i = 0; i < TRAIL_COUNT; i++) {
      const i3 = i * 3;
      const seed = Math.random();
      seeds[i] = seed;

      const angle = Math.random() * Math.PI * 2;
      const radius = 2.5 + Math.random() * 4.5;
      const vertical = (Math.random() - 0.5) * 4.4;

      // Local coordinates, centered on the object's own origin — the ring's
      // real-world offset is applied via the mesh's position prop instead,
      // so it can rotate around its own center.
      positions[i3] = Math.cos(angle) * radius;
      positions[i3 + 1] = vertical;
      positions[i3 + 2] = Math.sin(angle) * radius;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    return { geometry, seeds };
  }, []);

  useEffect(() => {
    return () => {
      data.geometry.dispose();
    };
  }, [data]);

  useFrame((state, delta) => {
    const group = groupRef.current;
    const points = pointsRef.current;
    if (!points || !group) return;

    const position = points.geometry.getAttribute("position") as THREE.BufferAttribute;
    const array = position.array as Float32Array;

    const target = getScrollProgress();
    smoothScroll.current = THREE.MathUtils.damp(
      smoothScroll.current,
      target,
      4.5,
      delta
    );
    const scroll = smoothScroll.current;

    const rawStrength = THREE.MathUtils.smoothstep(scroll, FLOW_START, FLOW_END);
    const strength = rawStrength * rawStrength * (3 - 2 * rawStrength);

    for (let i = 0; i < TRAIL_COUNT; i++) {
      const i3 = i * 3;
      const seed = data.seeds[i];

      // Keep the outer particles stationary before the blast — they only
      // expand based on (smoothed) scroll progress.
      const angle = seed * Math.PI * 2;
      const baseRadius = 2.7 + seed * 4.4;
      const radius = baseRadius + strength * seed * 3.5;

      const x = Math.cos(angle) * radius;
      const y = (seed - 0.5) * (4.4 + strength * 2.4);
      const z = Math.sin(angle) * radius;

      array[i3] = THREE.MathUtils.lerp(Math.cos(angle) * baseRadius, x, strength);
      array[i3 + 1] = THREE.MathUtils.lerp((seed - 0.5) * 4.4, y, strength);
      array[i3 + 2] = THREE.MathUtils.lerp(Math.sin(angle) * baseRadius, z, strength);
    }

    position.needsUpdate = true;

    // Slow counter-rotation relative to the globe — the mismatch in speed
    // and direction is what reads as depth/parallax rather than one flat
    // spinning disc.
    group.rotation.y -= FLOW_SPIN_SPEED * delta;
  });

  return (
    <group ref={groupRef} position={[-1.65, 0, 0]}>
      {/* Glow Layer */}
      <points geometry={data.geometry} frustumCulled={false}>
        <pointsMaterial
          color="#77736d"
          size={0.024}
          transparent
          opacity={0.08}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      
      {/* Core Layer - Unchanged size and opacity */}
      <points ref={pointsRef} geometry={data.geometry} frustumCulled={false}>
        <pointsMaterial
          color="#77736d"
          size={0.008}
          transparent
          opacity={0.18}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/* =========================================================
   MAIN
   ========================================================= */

export default function Intelligence3D() {
  return (
    <div className="intelligence-3d">
      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0, 7.2],
          // Desktop = original 44, mobile = 62.
          fov: typeof window !== "undefined" && window.innerWidth <= 650 ? 62 : 44,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        {/* Fades far-flung particles into the page background instead of a
            hard edge, which is most of what reads as real depth here. */}
        <fog attach="fog" args={["#f5f3ef", 4, 13]} />

        <EarthParticles />
        <FlowParticles />
      </Canvas>
    </div>
  );
}