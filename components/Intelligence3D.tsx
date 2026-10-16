"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";

const LAND_MASK_URL = "/land-mask.png";
const LAND_PARTICLE_COUNT = 12_000;
const DESKTOP_RADIUS = 1.72;
const MOBILE_RADIUS = 1.2;
const EARTH_SPIN_SPEED = 0.06;
const CAMERA_FOV = 44;

type LandParticleData = {
  geometry: THREE.BufferGeometry;
  earthX: number;
  earthY: number;
  radius: number;
};

/**
 * The mask is source data only. White pixels represent land and black pixels
 * represent ocean. Accepted land samples are converted to real 3D sphere
 * coordinates; the image itself is never drawn in the scene.
 */
function createLandParticleData(image: HTMLImageElement): LandParticleData {
  const width = image.naturalWidth;
  const height = image.naturalHeight;
  const source = document.createElement("canvas");
  source.width = width;
  source.height = height;

  const context = source.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Could not read the continent mask canvas.");

  context.drawImage(image, 0, 0, width, height);
  const pixels = context.getImageData(0, 0, width, height).data;
  const isMobile = window.innerWidth <= 650;
  const radius = isMobile ? MOBILE_RADIUS : DESKTOP_RADIUS;
  const earthX = isMobile ? 1 : -1.05;
  const earthY = isMobile ? -2.6 : 0;

  const positions = new Float32Array(LAND_PARTICLE_COUNT * 3);
  let count = 0;
  const maxAttempts = LAND_PARTICLE_COUNT * 18;

  // Uniformly sample points on a sphere and reject points over the ocean.
  for (
    let attempt = 0;
    attempt < maxAttempts && count < LAND_PARTICLE_COUNT;
    attempt++
  ) {
    const sinLatitude = Math.random() * 2 - 1;
    const latitude = Math.asin(sinLatitude);
    const longitude = (Math.random() * 2 - 1) * Math.PI;

    const px = Math.min(
      width - 1,
      Math.floor(((longitude + Math.PI) / (Math.PI * 2)) * width),
    );
    const py = Math.min(
      height - 1,
      Math.floor(((Math.PI / 2 - latitude) / Math.PI) * height),
    );
    const pixel = (py * width + px) * 4;

    // The alpha check also avoids sampling transparent areas as land.
    if (pixels[pixel] < 180 || pixels[pixel + 3] < 128) continue;

    const i3 = count * 3;
    const cosLatitude = Math.cos(latitude);
    const surfaceNoise = 0.985 + Math.random() * 0.03;

    positions[i3] = cosLatitude * Math.sin(longitude) * radius * surfaceNoise;
    positions[i3 + 1] = sinLatitude * radius * surfaceNoise;
    positions[i3 + 2] = cosLatitude * Math.cos(longitude) * radius * surfaceNoise;
    count++;
  }

  if (count < LAND_PARTICLE_COUNT * 0.8) {
    throw new Error(`Land mask produced only ${count} land particles.`);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions.slice(0, count * 3), 3),
  );

  return { geometry, earthX, earthY, radius };
}

function ParticleGlobe({ data }: { data: LandParticleData }) {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useRef(false);

  const crispMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#20201f",
        size: 0.014,
        transparent: true,
        opacity: 0.78,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      }),
    [],
  );

  const glowMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#bcb9b1",
        size: 0.042,
        transparent: true,
        opacity: 0.10,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      data.geometry.dispose();
      crispMaterial.dispose();
      glowMaterial.dispose();
    };
  }, [data, crispMaterial, glowMaterial]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotion.current = media.matches;

    const onChange = (event: MediaQueryListEvent) => {
      reducedMotion.current = event.matches;
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    // The globe only rotates in place. There is no scroll-triggered breakup,
    // particle explosion, debris field, or extra flow-particle system.
    if (!reducedMotion.current) {
      group.rotation.y += EARTH_SPIN_SPEED * delta;
      group.rotation.x = 0.12 + Math.sin(state.clock.elapsedTime * 0.12) * 0.025;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[data.earthX, data.earthY, 0]}
      rotation={[0.08, -0.72, 0]}
    >
      {/* Invisible depth shell: hides far-side land particles without drawing water. */}
      <mesh renderOrder={0}>
        <sphereGeometry args={[data.radius * 0.94, 64, 48]} />
        <meshBasicMaterial
          colorWrite={false}
          depthWrite
          side={THREE.FrontSide}
        />
      </mesh>

      {/* Land points are actual 3D positions on the rotating sphere. */}
      <points
        geometry={data.geometry}
        material={glowMaterial}
        frustumCulled={false}
        renderOrder={1}
      />
      <points
        geometry={data.geometry}
        material={crispMaterial}
        frustumCulled={false}
        renderOrder={2}
      />
    </group>
  );
}

export default function Intelligence3D() {
  const [landData, setLandData] = useState<LandParticleData | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const image = new Image();
    image.decoding = "async";
    image.src = LAND_MASK_URL;

    image.onload = () => {
      if (cancelled) return;
      try {
        setLandData(createLandParticleData(image));
      } catch (error) {
        console.error("[Intelligence3D] Failed to create continent particles.", error);
        setLoadFailed(true);
      }
    };

    image.onerror = () => {
      if (cancelled) return;
      console.error(
        `[Intelligence3D] Missing ${LAND_MASK_URL}. Add it at public/land-mask.png.`,
      );
      setLoadFailed(true);
    };

    return () => {
      cancelled = true;
      image.onload = null;
      image.onerror = null;
    };
  }, []);

  return (
    <div
      className="intelligence-3d"
      role="img"
      aria-label="Three-dimensional globe formed from rotating particles across the continents"
      data-globe-status={loadFailed ? "error" : landData ? "ready" : "loading"}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: [0, 0, 7.2],
          fov:
            typeof window !== "undefined" && window.innerWidth <= 650
              ? 62
              : CAMERA_FOV,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <fog attach="fog" args={["#f5f3ef", 4, 13]} />
        {landData ? <ParticleGlobe data={landData} /> : null}
      </Canvas>
    </div>
  );
}
