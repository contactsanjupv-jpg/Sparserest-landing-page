"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  1. The Crisscross Rig Globe (with 8D glow layers)                  */
/* ------------------------------------------------------------------ */
function RiggedGlobe() {
  const group = useRef<THREE.Group>(null);
  const rig1 = useRef<THREE.Mesh>(null);
  const rig2 = useRef<THREE.Mesh>(null);
  const rig3 = useRef<THREE.Mesh>(null);
  const rig4 = useRef<THREE.Mesh>(null);
  const rig5 = useRef<THREE.Mesh>(null);
  const rig6 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y += 0.05 * delta;

    // Frame-rate independent rotations (smooth as hell on any refresh rate)
    if (rig1.current) rig1.current.rotation.z += 0.1 * delta;
    if (rig2.current) rig2.current.rotation.x += 0.15 * delta;
    if (rig3.current) rig3.current.rotation.y -= 0.12 * delta;
    if (rig4.current) rig4.current.rotation.z -= 0.08 * delta;
    if (rig5.current) rig5.current.rotation.x -= 0.18 * delta;
    if (rig6.current) rig6.current.rotation.y += 0.14 * delta;
  });

  return (
    <group ref={group}>
      {/* 1. Inner Core Lattice (Data core) */}
      <mesh>
        <icosahedronGeometry args={[0.6, 2]} />
        <meshBasicMaterial
          color="#111111"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* 2. Equatorial Rig + Glow Halo */}
      <mesh ref={rig1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.006, 16, 128]} />
        <meshBasicMaterial color="#111111" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.025, 16, 128]} />
        <meshBasicMaterial
          color="#111111"
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Primary Meridian Rig + Glow */}
      <mesh ref={rig2}>
        <torusGeometry args={[1.3, 0.005, 16, 128]} />
        <meshBasicMaterial color="#333333" transparent opacity={0.25} />
      </mesh>
      <mesh>
        <torusGeometry args={[1.3, 0.02, 16, 128]} />
        <meshBasicMaterial
          color="#333333"
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 4. Secondary Meridian Rig + Glow */}
      <mesh ref={rig3} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[1.3, 0.005, 16, 128]} />
        <meshBasicMaterial color="#333333" transparent opacity={0.25} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[1.3, 0.02, 16, 128]} />
        <meshBasicMaterial
          color="#333333"
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 5. Diagonal Crisscross Rig 1 */}
      <mesh ref={rig4} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[1.3, 0.004, 16, 128]} />
        <meshBasicMaterial color="#555555" transparent opacity={0.18} />
      </mesh>

      {/* 6. Diagonal Crisscross Rig 2 */}
      <mesh ref={rig5} rotation={[-Math.PI / 4, -Math.PI / 4, 0]}>
        <torusGeometry args={[1.3, 0.004, 16, 128]} />
        <meshBasicMaterial color="#555555" transparent opacity={0.18} />
      </mesh>

      {/* 7. Diagonal Crisscross Rig 3 */}
      <mesh ref={rig6} rotation={[Math.PI / 3, -Math.PI / 6, Math.PI / 4]}>
        <torusGeometry args={[1.3, 0.003, 16, 128]} />
        <meshBasicMaterial color="#777777" transparent opacity={0.12} />
      </mesh>

      {/* 8. Structural Nodes at Intersections (with glow spheres) */}
      <mesh position={[1.3, 0, 0]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color="#111111" />
      </mesh>
      <mesh position={[1.3, 0, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial
          color="#111111"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[-1.3, 0, 0]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color="#111111" />
      </mesh>
      <mesh position={[-1.3, 0, 0]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshBasicMaterial
          color="#111111"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh position={[0, 1.3, 0]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color="#333333" />
      </mesh>
      <mesh position={[0, -1.3, 0]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color="#333333" />
      </mesh>
      <mesh position={[0, 0, 1.3]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color="#333333" />
      </mesh>
      <mesh position={[0, 0, -1.3]}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color="#333333" />
      </mesh>

      {/* 9. The "Storm" Anomaly (Structural disruption) */}
      <mesh position={[0.9, -0.5, 1.0]} rotation={[0, 0.8, 0.2]}>
        <torusGeometry args={[0.12, 0.008, 16, 32]} />
        <meshBasicMaterial color="#111111" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Minimalist Interface Rings (with 8D glow halos)                 */
/* ------------------------------------------------------------------ */
function InterfaceRings() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (r1.current) r1.current.rotation.z += 0.1 * delta;
    if (r2.current) r2.current.rotation.x -= 0.15 * delta;
    if (r3.current) r3.current.rotation.y += 0.08 * delta;
  });

  return (
    <group>
      {/* Equatorial Data Track + Glow Halo */}
      <mesh ref={r1} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.0, 0.003, 16, 200]} />
        <meshBasicMaterial color="#111111" transparent opacity={0.2} />
        <mesh position={[2.0, 0, 0]}>
          <sphereGeometry args={[0.03, 16, 16]} />
          <meshBasicMaterial color="#111111" />
        </mesh>
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.0, 0.03, 16, 200]} />
        <meshBasicMaterial
          color="#111111"
          transparent
          opacity={0.03}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Tilted Interface Ring + Glow */}
      <mesh ref={r2} rotation={[1.2, 0.6, 0.4]}>
        <torusGeometry args={[2.3, 0.002, 16, 200]} />
        <meshBasicMaterial color="#333333" transparent opacity={0.15} />
      </mesh>
      <mesh rotation={[1.2, 0.6, 0.4]}>
        <torusGeometry args={[2.3, 0.025, 16, 200]} />
        <meshBasicMaterial
          color="#333333"
          transparent
          opacity={0.025}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Outer Boundary Ring + Glow */}
      <mesh ref={r3} rotation={[0.4, 1.4, 0.8]}>
        <torusGeometry args={[2.6, 0.0015, 16, 200]} />
        <meshBasicMaterial color="#555555" transparent opacity={0.1} />
      </mesh>
      <mesh rotation={[0.4, 1.4, 0.8]}>
        <torusGeometry args={[2.6, 0.02, 16, 200]} />
        <meshBasicMaterial
          color="#555555"
          transparent
          opacity={0.02}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  3. Subtle 4D Hypercube (Distant, mind-bending background element)  */
/* ------------------------------------------------------------------ */
function Hypercube4D() {
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const vertices4D = useMemo(() => {
    const verts = [];
    for (let i = 0; i < 16; i++) {
      verts.push([
        (i & 1) ? 1 : -1,
        (i & 2) ? 1 : -1,
        (i & 4) ? 1 : -1,
        (i & 8) ? 1 : -1,
      ]);
    }
    return verts;
  }, []);

  const edges = useMemo(() => {
    const e = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        let diff = 0;
        if ((i & 1) !== (j & 1)) diff++;
        if ((i & 2) !== (j & 2)) diff++;
        if ((i & 4) !== (j & 4)) diff++;
        if ((i & 8) !== (j & 8)) diff++;
        if (diff === 1) e.push([i, j]);
      }
    }
    return e;
  }, []);

  const positions = useMemo(() => new Float32Array(edges.length * 2 * 3), [edges]);

  useFrame((state, delta) => {
    const angleXW = state.clock.elapsedTime * 0.08;
    const angleYW = state.clock.elapsedTime * 0.12;
    const angleZW = state.clock.elapsedTime * 0.05;

    const cosXW = Math.cos(angleXW), sinXW = Math.sin(angleXW);
    const cosYW = Math.cos(angleYW), sinYW = Math.sin(angleYW);
    const cosZW = Math.cos(angleZW), sinZW = Math.sin(angleZW);

    const projected3D = [];

    for (let i = 0; i < 16; i++) {
      let [x, y, z, w] = vertices4D[i];

      let nx = x * cosXW - w * sinXW;
      let nw = x * sinXW + w * cosXW;
      x = nx; w = nw;

      let ny = y * cosYW - w * sinYW;
      nw = y * sinYW + w * cosYW;
      y = ny; w = nw;

      let nz = z * cosZW - w * sinZW;
      nw = z * sinZW + w * cosZW;
      z = nz; w = nw;

      const distance = 2.5;
      const k = distance / (distance - w);
      
      const px = x * k * 2.5;
      const py = y * k * 2.5;
      const pz = z * k * 2.5;

      projected3D.push([px, py, pz]);
    }

    let index = 0;
    for (let edge of edges) {
      const p1 = projected3D[edge[0]];
      const p2 = projected3D[edge[1]];
      positions[index++] = p1[0]; positions[index++] = p1[1]; positions[index++] = p1[2];
      positions[index++] = p2[0]; positions[index++] = p2[1]; positions[index++] = p2[2];
    }

    if (geometryRef.current) geometryRef.current.attributes.position.needsUpdate = true;
  });

  return (
    <group position={[0, 0, -4]} rotation={[0.4, 0.2, 0.8]}>
      <lineSegments>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={positions.length / 3}
            itemSize={3}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#aaaaaa" linewidth={1} transparent opacity={0.08} />
      </lineSegments>
      {/* Glow duplicate for volumetric 8D feel */}
      <lineSegments>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={positions.length / 3}
            itemSize={3}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#aaaaaa"
          linewidth={3}
          transparent
          opacity={0.02}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  4. Deep Space "Astronaut" Particle Field (The 8D feel)             */
/* ------------------------------------------------------------------ */
function DeepSpaceParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const glowRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.02 * delta;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.02;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y += 0.02 * delta;
      glowRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.02;
    }
  });

  return (
    <group>
      {/* Glow Layer (8D halo) */}
      <points ref={glowRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
            count={particles.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.18}
          color="#111111"
          transparent
          opacity={0.05}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Core Layer (crisp stars) */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles, 3]}
            count={particles.length / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#111111"
          transparent
          opacity={0.3}
          sizeAttenuation
          blending={THREE.NormalBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  5. Camera Parallax (Creates the massive 8D depth illusion)         */
/* ------------------------------------------------------------------ */
function CameraRig() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 9));

  useFrame((state, delta) => {
    const { x, y } = state.pointer;
    target.current.set(x * 1.5, y * 1.0, 9 - Math.abs(x) * 0.8);

    // Frame-rate independent smoothing via damp (buttery smooth on any Hz)
    camera.position.x = THREE.MathUtils.damp(camera.position.x, target.current.x, 4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, target.current.y, 4, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, target.current.z, 4, delta);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ------------------------------------------------------------------ */
/*  Main Scene                                                         */
/* ------------------------------------------------------------------ */
function Scene() {
  return (
    <>
      <CameraRig />

      {/* The entire core assembly floats gently */}
      <Float speed={1.0} rotationIntensity={0.1} floatIntensity={0.3}>
        <RiggedGlobe />
        <InterfaceRings />
        <Hypercube4D />
      </Float>

      {/* The massive deep space particle field */}
      <DeepSpaceParticles />

      {/* Subtle twinkling stars scattered across the universe */}
      <Sparkles
        count={200}
        scale={20}
        size={1.5}
        speed={0.1}
        opacity={0.2}
        color="#000000"
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Export                                                             */
/* ------------------------------------------------------------------ */
export default function Hero3D() {
  return (
    <div className="hero-3d w-full h-full min-h-[600px] relative">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={[1, 2]}
        gl={{ 
          alpha: true,
          antialias: true, 
          powerPreference: "high-performance" 
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}