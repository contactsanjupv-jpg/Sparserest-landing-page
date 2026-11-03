"use client";

/* eslint-disable react-hooks/immutability */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";

const LAND_MASK_URL = "/land-mask.png";
const LAND_PARTICLE_COUNT = 12_000;
const DESKTOP_RADIUS = 1.72;
const MOBILE_RADIUS = 2.3;
const MOBILE_BREAKPOINT = 900;
const EARTH_SPIN_SPEED = 0.06;
const CAMERA_FOV = 44;

type LandParticleData = {
  geometry: THREE.BufferGeometry;
};

function createLandParticleData(image: HTMLImageElement): LandParticleData {
  const width = image.naturalWidth;
  const height = image.naturalHeight;

  const source = document.createElement("canvas");
  source.width = width;
  source.height = height;

  const context = source.getContext("2d", {
    willReadFrequently: true,
  });

  if (!context) {
    throw new Error("Could not read the continent mask canvas.");
  }

  context.drawImage(image, 0, 0, width, height);

  const pixels = context.getImageData(0, 0, width, height).data;

  const positions = new Float32Array(LAND_PARTICLE_COUNT * 3);
  const seeds = new Float32Array(LAND_PARTICLE_COUNT);

  let count = 0;
  const maxAttempts = LAND_PARTICLE_COUNT * 18;

  // Uniformly distribute samples over a unit sphere, accepting
  // only points that fall on land in the mask.
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

    if (pixels[pixel] < 180 || pixels[pixel + 3] < 128) {
      continue;
    }

    const i3 = count * 3;
    const cosLatitude = Math.cos(latitude);
    const surfaceNoise = 0.985 + Math.random() * 0.03;

    positions[i3] = cosLatitude * Math.sin(longitude) * surfaceNoise;
    positions[i3 + 1] = sinLatitude * surfaceNoise;
    positions[i3 + 2] = cosLatitude * Math.cos(longitude) * surfaceNoise;

    seeds[count] = Math.random();

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
  geometry.setAttribute(
    "aSeed",
    new THREE.BufferAttribute(seeds.slice(0, count), 1),
  );

  return {
    geometry,
  };
}

/**
 * Vertex shader preserving exact THREE.PointsMaterial world-space sizing
 * while adding:
 * 1. DSLR shallow depth-of-field (pin-sharp front continents, softly blurred far continents)
 * 2. The 9-second 3D wave dispersion animation from the reference GIF
 * 3. Diamond-like facet shimmer + natural optical amber blur on animated particles
 */
const DSLR_PARTICLE_VERTEX_SHADER = /* glsl */ `
  attribute float aSeed;

  uniform float uTime;
  uniform float uViewportHeight;
  uniform float uPixelRatio;
  uniform float uPointScale;
  uniform float uIsGlowPass;

  varying float vFacing;
  varying float vDepthBlur;
  varying float vAnim;
  varying float vSparkle;

  void main() {
    vec3 basePos = position;
    vec3 unitPos = normalize(basePos);
    float baseLen = length(basePos);

    // 9-second wave dispersion cycle matching the reference GIF
    float cycle = mod(uTime, 9.0);
    float swellIn = smoothstep(0.8, 2.3, cycle);
    float settleOut = 1.0 - smoothstep(6.0, 8.2, cycle);
    float waveEnvelope = swellIn * settleOut;

    // Traveling wave front sweeping across the sphere
    float sweepProgress = clamp((cycle - 0.5) / 6.8, 0.0, 1.0);
    float sweepCenter = 1.2 - sweepProgress * 2.4;

    vec3 waveDir = normalize(vec3(
      cos(uTime * 0.24) * 0.74,
      0.58,
      sin(uTime * 0.24) * 0.36
    ));

    float dotWave = dot(unitPos, waveDir);
    float band = max(0.0, 1.0 - abs(dotWave - sweepCenter) * 1.15);

    // Smooth 3D harmonic turbulence ridges
    float n1 = sin(unitPos.x * 4.5 + uTime * 1.6) *
               cos(unitPos.y * 4.5 - uTime * 1.3) *
               sin(unitPos.z * 4.5 + uTime * 1.1);
    float n2 = sin(unitPos.x * 9.5 - uTime * 2.3 + aSeed * 6.2831) *
               cos(unitPos.z * 8.5 + uTime * 2.0);

    float ridge = max(0.0, n1 * 0.65 + n2 * 0.35 + 0.42);
    float anim = waveEnvelope * band * band * ridge;

    // Outward wave lift + subtle curl scatter
    float radialBoost = 1.0 + anim * (0.11 + aSeed * 0.14);
    float swirl = anim * 0.035 * n2;

    vec3 animatedPos = vec3(
      basePos.x * radialBoost - basePos.z * swirl,
      basePos.y * radialBoost + n1 * anim * 0.025,
      basePos.z * radialBoost + basePos.x * swirl
    );

    vec4 mvPosition = modelViewMatrix * vec4(animatedPos, 1.0);
    vec3 viewNormal = normalize(normalMatrix * unitPos);
    vec3 viewDir = normalize(-mvPosition.xyz);

    // > 0 = front hemisphere (in DSLR focus), < 0 = back hemisphere (soft bokeh blur)
    float facing = dot(viewNormal, viewDir);
    vFacing = facing;

    // DSLR depth-of-field blur amount increases smoothly toward the back of the globe
    float depthBlur = smoothstep(0.18, -0.75, facing);
    vDepthBlur = depthBlur;

    vAnim = clamp(anim * 1.65, 0.0, 1.0);

    // High-frequency diamond facet glint on animated particles
    float glintPhase = sin(uTime * 10.5 + aSeed * 62.8318 + unitPos.x * 12.0);
    vSparkle = pow(0.5 + 0.5 * glintPhase, 4.0);

    // Exact THREE.PointsMaterial perspective projection scale (FOV = 44 deg -> tan(22 deg) = 0.404026)
    float projScale = (uViewportHeight * uPixelRatio * 0.5) / 0.404026;

    // Match your original minimal world sizes (0.0155 front, softened bokeh on back)
    float worldSize = mix(0.0155, 0.0195, depthBlur) * uPointScale;

    if (uIsGlowPass > 0.5) {
      // Natural optical blur halo size around animated particles
      worldSize = (0.048 + vSparkle * 0.012) * uPointScale;
    } else {
      // Subtle diamond size pop when catching the light during wave animation
      worldSize *= (1.0 + vAnim * 0.18 + vAnim * vSparkle * 0.16);
    }

    gl_PointSize = clamp(worldSize * (projScale / max(1.5, -mvPosition.z)), 1.0, 64.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const DSLR_PARTICLE_FRAGMENT_SHADER = /* glsl */ `
  uniform float uIsGlowPass;

  varying float vFacing;
  varying float vDepthBlur;
  varying float vAnim;
  varying float vSparkle;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float dist = length(uv);
    if (dist > 0.5) discard;

    // Pass 1: Natural optical blur glow ONLY on animated wave particles
    if (uIsGlowPass > 0.5) {
      if (vAnim < 0.03) discard;

      // True Gaussian optical blur falloff (never muddy or hard-edged)
      float r = dist * 2.0;
      float gaussianBlur = exp(-r * r * 3.4) * smoothstep(1.0, 0.65, r);

      // Pure, un-darkened golden amber to warm diamond-champagne center
      vec3 outerAmber = vec3(1.0, 0.64, 0.08);
      vec3 innerDiamond = vec3(1.0, 0.91, 0.58);
      vec3 glowColor = mix(outerAmber, innerDiamond, gaussianBlur);

      float frontWeight = mix(0.45, 1.0, smoothstep(-0.3, 0.2, vFacing));
      float glowAlpha = gaussianBlur * vAnim * (0.28 + vSparkle * 0.18) * frontWeight;

      gl_FragColor = vec4(glowColor, glowAlpha);
      return;
    }

    // Pass 2: Main continent particles with DSLR Depth-of-Field + Diamond Shine
    // Front particles have a tack-sharp edge; far-side particles have a soft Gaussian bokeh blur
    float sharpDisc = smoothstep(0.48, 0.24, dist);
    float r = dist * 2.0;
    float bokehDisc = exp(-r * r * 2.6) * smoothstep(1.0, 0.6, r);
    float shapeAlpha = mix(sharpDisc, bokehDisc, vDepthBlur);

    // Base minimal colors: crisp #20201f on focused front, #85847d on blurred far side
    vec3 frontInk = vec3(0.125, 0.125, 0.122);
    vec3 backStone = vec3(0.522, 0.518, 0.490);
    vec3 baseColor = mix(frontInk, backStone, vDepthBlur);
    float baseOpacity = mix(0.86, 0.26, vDepthBlur);

    // When animated by the wave, particles shine like crisp amber diamonds:
    // rich warm amber rim + brilliant champagne-white diamond center facet
    float coreFacet = smoothstep(0.32, 0.0, dist);
    vec3 amberRim = vec3(0.96, 0.60, 0.06);
    vec3 diamondCore = vec3(1.0, 0.97, 0.86);
    vec3 diamondColor = mix(amberRim, diamondCore, coreFacet * (0.65 + vSparkle * 0.35));

    float activeMix = smoothstep(0.04, 0.55, vAnim);
    vec3 finalColor = mix(baseColor, diamondColor, activeMix);

    float finalAlpha = shapeAlpha * clamp(baseOpacity + activeMix * (0.14 + vSparkle * 0.12), 0.0, 0.98);
    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

function ParticleGlobe({ data }: { data: LandParticleData }) {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useRef(false);

  const { size, gl } = useThree();
    const isMobile = size.width <= MOBILE_BREAKPOINT;

  // Desktop: globe sits left of the copy. Stacked layout: globe is centered
  // and fills its own block above the text.
  const layout = useMemo(
    () =>
      isMobile
        ? { radius: MOBILE_RADIUS, earthX: 0, earthY: 0, pointScale: 1.7 }
        : { radius: DESKTOP_RADIUS, earthX: -1.05, earthY: 0, pointScale: 1.0 },
    [isMobile],
  );

  const glowMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: DSLR_PARTICLE_VERTEX_SHADER,
        fragmentShader: DSLR_PARTICLE_FRAGMENT_SHADER,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        blending: THREE.NormalBlending,
        uniforms: {
          uTime: { value: 0 },
          uViewportHeight: { value: 800 },
          uPixelRatio: { value: 1.5 },
          uPointScale: { value: 1.0 },
          uIsGlowPass: { value: 1.0 },
        },
      }),
    [],
  );

  const particleMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: DSLR_PARTICLE_VERTEX_SHADER,
        fragmentShader: DSLR_PARTICLE_FRAGMENT_SHADER,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        blending: THREE.NormalBlending,
        uniforms: {
          uTime: { value: 0 },
          uViewportHeight: { value: 800 },
          uPixelRatio: { value: 1.5 },
          uPointScale: { value: 1.0 },
          uIsGlowPass: { value: 0.0 },
        },
      }),
    [],
  );

  useEffect(() => {
    const dpr = Math.min(gl.getPixelRatio(), 2.5);
    glowMaterial.uniforms.uViewportHeight.value = size.height;
    glowMaterial.uniforms.uPixelRatio.value = dpr;
    glowMaterial.uniforms.uPointScale.value = layout.pointScale;

    particleMaterial.uniforms.uViewportHeight.value = size.height;
    particleMaterial.uniforms.uPixelRatio.value = dpr;
    particleMaterial.uniforms.uPointScale.value = layout.pointScale;
  }, [gl, size.height, layout.pointScale, glowMaterial, particleMaterial]);

  useEffect(() => {
    return () => {
      glowMaterial.dispose();
      particleMaterial.dispose();
    };
  }, [glowMaterial, particleMaterial]);

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

    if (!group || reducedMotion.current) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    glowMaterial.uniforms.uTime.value = elapsed;
    particleMaterial.uniforms.uTime.value = elapsed;

    group.rotation.y += EARTH_SPIN_SPEED * delta;

    group.rotation.x =
      0.12 + Math.sin(elapsed * 0.12) * 0.025;
  });

  return (
    <group
      ref={groupRef}
      position={[layout.earthX, layout.earthY, 0]}
      scale={[layout.radius, layout.radius, layout.radius]}
      rotation={[0.08, -0.72, 0]}
    >
      {/* Natural optical blur amber halo ONLY on wave-animated particles */}
      <points
        geometry={data.geometry}
        material={glowMaterial}
        frustumCulled={false}
        renderOrder={0}
      />

      {/* DSLR depth-of-field particles: tack-sharp front, soft bokeh back, diamond sparkle on wave */}
      <points
        geometry={data.geometry}
        material={particleMaterial}
        frustumCulled={false}
        renderOrder={1}
      />
    </group>
  );
}

export default function Intelligence3D() {
  const [landData, setLandData] = useState<LandParticleData | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let generatedData: LandParticleData | null = null;

    const image = new Image();
    image.decoding = "async";
    image.src = LAND_MASK_URL;

    image.onload = () => {
      if (cancelled) return;

      try {
        generatedData = createLandParticleData(image);
        setLandData(generatedData);
      } catch (error) {
        console.error(
          "[Intelligence3D] Failed to create continent particles.",
          error,
        );

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

      generatedData?.geometry.dispose();
    };
  }, []);

  return (
    <div
      className="intelligence-3d"
      role="img"
      aria-label="Three-dimensional globe formed from rotating particles across the continents"
      data-globe-status={
        loadFailed ? "error" : landData ? "ready" : "loading"
      }
    >
      <Canvas
        dpr={[1, 2.5]}
        camera={{
          position: [0, 0, 7.2],
          fov: CAMERA_FOV,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        {landData ? <ParticleGlobe data={landData} /> : null}
      </Canvas>
    </div>
  );
}