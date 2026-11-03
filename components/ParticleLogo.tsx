"use client";

/* eslint-disable react-hooks/immutability, react-hooks/purity */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type PointerEvent as ReactPointerEvent,
} from "react";

type ParticleLogoProps = {
  imageUrl?: string;
};

type ParticleData = {
  geometry: THREE.BufferGeometry;
  base: Float32Array;
  phases: Float32Array;
  count: number;
};

type SharedInteraction = {
  pointer: MutableRefObject<THREE.Vector2>;
  active: MutableRefObject<boolean>;
};

// Buttery smooth, frame-rate independent interpolation
const damp = (current: number, target: number, lambda: number, dt: number) => {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
};

function ParticleCloud({
  imageUrl,
  interaction,
}: {
  imageUrl: string;
  interaction: SharedInteraction;
}) {
  // 1. Context hooks MUST be first. R3F uses React Context internally.
  const { size } = useThree();

  // 2. Standard React hooks follow.
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const smoothPointer = useRef(new THREE.Vector2(0, 0));

  // 3. Load Image
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.decoding = "async";

    img.onload = () => {
      if (!cancelled) setImage(img);
    };

    img.src = imageUrl;

    return () => {
      cancelled = true;
    };
  }, [imageUrl]);

  // 4. Generate Dense, Bold Particle Grid
  const particleData = useMemo<ParticleData | null>(() => {
    if (!image) return null;

    const source = document.createElement("canvas");
    const sampleWidth = 1024; 
    const aspect = image.naturalHeight / image.naturalWidth;

    source.width = sampleWidth;
    source.height = Math.max(1, Math.round(sampleWidth * aspect));

    const context = source.getContext("2d", { willReadFrequently: true });
    if (!context) return null;

    context.imageSmoothingEnabled = true;
    context.drawImage(image, 0, 0, source.width, source.height);
    
    const { data, width, height } = context.getImageData(0, 0, source.width, source.height);

    const candidates: Array<{ x: number; y: number }> = [];
    const step = 1; 
    
    // Safe scale to guarantee the "T" stays inside the viewport
    const scale = 7.5 / Math.max(width, height); 

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const i = (y * width + x) * 4;
        const alpha = data[i + 3] / 255;

        if (alpha < 0.1) continue; 

        const luminance = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
        if (luminance > 0.85) continue; 

        candidates.push({
          x: (x - width / 2) * scale,
          y: (height / 2 - y) * scale,
        });
      }
    }

    if (candidates.length === 0) return null;

    const maxParticles = 80000; 
    const selected = candidates.length > maxParticles
      ? Array.from({ length: maxParticles }, (_, i) => candidates[Math.floor((i * candidates.length) / maxParticles)])
      : candidates;

    const positions = new Float32Array(selected.length * 3);
    const base = new Float32Array(selected.length * 3);
    const phases = new Float32Array(selected.length);

    selected.forEach((particle, index) => {
      const i = index * 3;
      positions[i] = particle.x;
      positions[i + 1] = particle.y;
      positions[i + 2] = (Math.random() - 0.5) * 0.02;

      base[i] = positions[i];
      base[i + 1] = positions[i + 1];
      base[i + 2] = positions[i + 2];

      phases[index] = Math.random() * Math.PI * 2;
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.computeBoundingSphere();

    return { geometry, base, phases, count: selected.length };
  }, [image]);

  // 5. Dispose Geometry
  useEffect(() => {
    return () => particleData?.geometry.dispose();
  }, [particleData]);

  // 6. Bold Liquid Mercury Materials
  const materials = useMemo(() => {
    const mobile = size.width < 600;
    return {
      halo: new THREE.PointsMaterial({
        color: "#e0e0e0", 
        size: mobile ? 0.06 : 0.05,
        transparent: true,
        opacity: 0.15,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      }),
      soft: new THREE.PointsMaterial({
        color: "#444444", 
        size: mobile ? 0.04 : 0.03,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      }),
      core: new THREE.PointsMaterial({
        color: "#000000", 
        size: mobile ? 0.02 : 0.015,
        transparent: true,
        opacity: 1,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      }),
    };
  }, [size.width]);

  // 7. Dispose Materials
  useEffect(() => {
    return () => {
      materials.halo.dispose();
      materials.soft.dispose();
      materials.core.dispose();
    };
  }, [materials]);

  // 8. The Liquid Mercury Loop
  useFrame((state, delta) => {
    if (!particleData) return;

    const safeDelta = Math.min(delta, 0.1);
    const positionAttribute = particleData.geometry.attributes.position as THREE.BufferAttribute;
    const positions = positionAttribute.array as Float32Array;
    const { base, phases, count } = particleData;

    const targetPointer = interaction.pointer.current;
    const isActive = interaction.active.current;

    smoothPointer.current.x = damp(smoothPointer.current.x, targetPointer.x, 3, safeDelta);
    smoothPointer.current.y = damp(smoothPointer.current.y, targetPointer.y, 3, safeDelta);

    const cursorX = smoothPointer.current.x * 3.75;
    const cursorY = smoothPointer.current.y * 3.75;

    const tension = isActive ? 14 : 4;
    const returnFollow = 1 - Math.exp(-tension * safeDelta);
    
    const radius = 1.8;
    const time = state.clock.elapsedTime;

    for (let index = 0; index < count; index++) {
      const i = index * 3;
      
      const bx = base[i];
      const by = base[i + 1];
      const bz = base[i + 2];

      let targetX = bx;
      let targetY = by;
      let targetZ = bz;

      if (!isActive) {
        const breath = Math.sin(time * 1.5 + phases[index]) * 0.02;
        targetZ += breath;
      } else {
        const dx = bx - cursorX;
        const dy = by - cursorY;
        const distanceSquared = dx * dx + dy * dy;
        
        if (distanceSquared < radius * radius) {
          const distance = Math.sqrt(distanceSquared);
          const safeDistance = Math.max(distance, 0.001);
          
          const influence = 1 - distance / radius;
          const force = influence * influence;
          
          const phase = phases[index];
          const swirl = Math.sin(phase + time * 4) * force * 0.5;
          
          const pull = force * 0.25;
          const push = force * 0.6;
          
          targetX += (dx / safeDistance) * (push - pull);
          targetY += (dy / safeDistance) * (push - pull);
          
          targetX += (dy / safeDistance) * swirl;
          targetY -= (dx / safeDistance) * swirl;

          targetZ += force * (0.6 + 0.3 * Math.sin(phase + time * 5));
        }
      }

      positions[i] += (targetX - positions[i]) * returnFollow;
      positions[i + 1] += (targetY - positions[i + 1]) * returnFollow;
      positions[i + 2] += (targetZ - positions[i + 2]) * returnFollow;
    }

    positionAttribute.needsUpdate = true;
  });

  // 9. Conditional return AFTER all hooks
  if (!particleData) return null;

  return (
    <group>
      <points geometry={particleData.geometry} material={materials.halo} frustumCulled={false} renderOrder={0} />
      <points geometry={particleData.geometry} material={materials.soft} frustumCulled={false} renderOrder={1} />
      <points geometry={particleData.geometry} material={materials.core} frustumCulled={false} renderOrder={2} />
    </group>
  );
}

export default function ParticleLogo({
  imageUrl = "/sparserest-mark.png",
}: ParticleLogoProps) {
  const pointer = useRef(new THREE.Vector2(0, 0));
  const active = useRef(false);

  const interaction = useMemo(() => ({ pointer, active }), []);

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointer.current.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -(((event.clientY - rect.top) / rect.height) * 2 - 1)
    );
    active.current = true;
  };

  const onPointerLeave = () => {
    active.current = false;
    pointer.current.set(0, 0);
  };

  return (
    <div className="particle-logo-stage">
      <div
        className="particle-logo-interaction"
        onPointerEnter={() => { active.current = true; }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        role="img"
        aria-label="SparseReST logo made from interactive particles"
      >
        <Canvas
          camera={{ position: [0, 0, 11], fov: 42, near: 0.1, far: 100 }}
          dpr={[1, 1.5]}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          frameloop="always"
        >
          <ParticleCloud imageUrl={imageUrl} interaction={interaction} />
        </Canvas>
      </div>
    </div>
  );
}