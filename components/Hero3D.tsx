"use client";

/* eslint-disable react-hooks/immutability, react-hooks/purity */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ */
/*  1. Crisscross rig globe                                            */
/* ------------------------------------------------------------------ */
function RiggedGlobe() {
  const group = useRef<THREE.Group>(null);
  const rig1 = useRef<THREE.Mesh>(null);
  const rig2 = useRef<THREE.Mesh>(null);
  const rig3 = useRef<THREE.Mesh>(null);
  const rig4 = useRef<THREE.Mesh>(null);
  const rig5 = useRef<THREE.Mesh>(null);
  const rig6 = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (group.current) group.current.rotation.y += 0.05 * delta;
    if (rig1.current) rig1.current.rotation.z += 0.1 * delta;
    if (rig2.current) rig2.current.rotation.x += 0.15 * delta;
    if (rig3.current) rig3.current.rotation.y -= 0.12 * delta;
    if (rig4.current) rig4.current.rotation.z -= 0.08 * delta;
    if (rig5.current) rig5.current.rotation.x -= 0.18 * delta;
    if (rig6.current) rig6.current.rotation.y += 0.14 * delta;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[0.6, 2]} />
        <meshBasicMaterial color="#111111" wireframe transparent opacity={0.12} />
      </mesh>

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

      <mesh ref={rig4} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[1.3, 0.004, 16, 128]} />
        <meshBasicMaterial color="#555555" transparent opacity={0.18} />
      </mesh>
      <mesh ref={rig5} rotation={[-Math.PI / 4, -Math.PI / 4, 0]}>
        <torusGeometry args={[1.3, 0.004, 16, 128]} />
        <meshBasicMaterial color="#555555" transparent opacity={0.18} />
      </mesh>
      <mesh ref={rig6} rotation={[Math.PI / 3, -Math.PI / 6, Math.PI / 4]}>
        <torusGeometry args={[1.3, 0.003, 16, 128]} />
        <meshBasicMaterial color="#777777" transparent opacity={0.12} />
      </mesh>

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
      <mesh position={[0.9, -0.5, 1.0]} rotation={[0, 0.8, 0.2]}>
        <torusGeometry args={[0.12, 0.008, 16, 32]} />
        <meshBasicMaterial color="#111111" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  2. Interface rings                                                 */
/* ------------------------------------------------------------------ */
function InterfaceRings() {
  const r1 = useRef<THREE.Mesh>(null);
  const r2 = useRef<THREE.Mesh>(null);
  const r3 = useRef<THREE.Mesh>(null);

  useFrame((_state, delta) => {
    if (r1.current) r1.current.rotation.z += 0.1 * delta;
    if (r2.current) r2.current.rotation.x -= 0.15 * delta;
    if (r3.current) r3.current.rotation.y += 0.08 * delta;
  });

  return (
    <group>
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
/*  3. Projected 4D hypercube                                          */
/* ------------------------------------------------------------------ */
type Vec4 = [number, number, number, number];

function Hypercube4D() {
  const { vertices, edges, geometry, projected } = useMemo(() => {
    const vertices: Vec4[] = [];
    for (let i = 0; i < 16; i++) {
      vertices.push([
        i & 1 ? 1 : -1,
        i & 2 ? 1 : -1,
        i & 4 ? 1 : -1,
        i & 8 ? 1 : -1,
      ]);
    }

    // Two vertices share an edge when their indices differ in exactly one bit.
    const edges: [number, number][] = [];
    for (let i = 0; i < 16; i++) {
      for (let j = i + 1; j < 16; j++) {
        const diff = i ^ j;
        if ((diff & (diff - 1)) === 0) edges.push([i, j]);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(edges.length * 2 * 3), 3).setUsage(
        THREE.DynamicDrawUsage,
      ),
    );

    return { vertices, edges, geometry, projected: new Float32Array(16 * 3) };
  }, []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const cosXW = Math.cos(t * 0.08), sinXW = Math.sin(t * 0.08);
    const cosYW = Math.cos(t * 0.12), sinYW = Math.sin(t * 0.12);
    const cosZW = Math.cos(t * 0.05), sinZW = Math.sin(t * 0.05);

    for (let i = 0; i < 16; i++) {
      let [x, y, z, w] = vertices[i];

      const nx = x * cosXW - w * sinXW;
      w = x * sinXW + w * cosXW;
      x = nx;

      const ny = y * cosYW - w * sinYW;
      w = y * sinYW + w * cosYW;
      y = ny;

      const nz = z * cosZW - w * sinZW;
      w = z * sinZW + w * cosZW;
      z = nz;

      const scale = (2.5 / (2.5 - w)) * 2.5;
      projected[i * 3] = x * scale;
      projected[i * 3 + 1] = y * scale;
      projected[i * 3 + 2] = z * scale;
    }

    const attribute = geometry.getAttribute("position") as THREE.BufferAttribute;
    const out = attribute.array as Float32Array;

    edges.forEach(([a, b], e) => {
      out.set(projected.subarray(a * 3, a * 3 + 3), e * 6);
      out.set(projected.subarray(b * 3, b * 3 + 3), e * 6 + 3);
    });

    attribute.needsUpdate = true;
  });

  return (
    <group position={[0, 0, -4]} rotation={[0.4, 0.2, 0.8]}>
      <lineSegments geometry={geometry} frustumCulled={false}>
        <lineBasicMaterial color="#aaaaaa" transparent opacity={0.08} />
      </lineSegments>
      <lineSegments geometry={geometry} frustumCulled={false}>
        <lineBasicMaterial
          color="#aaaaaa"
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
/*  4. Deep-space particles                                            */
/* ------------------------------------------------------------------ */
function DeepSpaceParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const glowRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 4 + Math.random() * 15;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    const tiltX = Math.sin(state.clock.elapsedTime * 0.05) * 0.02;
    for (const points of [pointsRef.current, glowRef.current]) {
      if (!points) continue;
      points.rotation.y += 0.02 * delta;
      points.rotation.x = tiltX;
    }
  });

  return (
    <group>
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
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  5. Camera parallax                                                 */
/* ------------------------------------------------------------------ */
function CameraRig() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 9));

  useFrame((state, delta) => {
    const { x, y } = state.pointer;
    target.current.set(x * 1.5, y * 1.0, 9 - Math.abs(x) * 0.8);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, target.current.x, 4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, target.current.y, 4, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, target.current.z, 4, delta);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/* ------------------------------------------------------------------ */
/*  Scene + export                                                     */
/* ------------------------------------------------------------------ */
function Scene() {
  return (
    <>
      <CameraRig />
      <Float speed={1.0} rotationIntensity={0.1} floatIntensity={0.3}>
        <RiggedGlobe />
        <InterfaceRings />
        <Hypercube4D />
      </Float>
      <DeepSpaceParticles />
      <Sparkles count={200} scale={20} size={1.5} speed={0.1} opacity={0.2} color="#000000" />
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="hero-3d">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}