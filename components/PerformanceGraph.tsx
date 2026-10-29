"use client";

import { useEffect, useRef } from "react";

const VERT = `#version 300 es
in vec2 aCorner;
void main() {
  gl_Position = vec4(aCorner, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2 uRes;
uniform mat3 uTurn;
uniform float uAngle;
uniform float uPhaseT;
uniform float uSwell;
uniform float uRadius;
uniform float uDist;
uniform float uFocal;
uniform float uGrain;
uniform float uTwist;
uniform float uGlow;
uniform float uVeil;
uniform float uSheet;
uniform vec3 uHueA;
uniform vec3 uHueB;
uniform vec3 uHueC;
uniform vec3 uCore;
uniform int uSteps;

out vec4 fragOut;

mat2 spinMat(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

vec3 shell(vec3 p, mat2 r, float k) {
  p.xz = r * p.xz;
  p.z += uRadius;
  return p * k;
}

float lattice(vec3 p, vec3 ph) {
  p.xy *= mat2(cos(p.z * uTwist - vec4(0.0, 11.0, 33.0, 0.0)));
  float f = 1.0 - abs(p.y);
  float m = 1.0;
  for (int o = 0; o < 7; o++) {
    vec3 q = p * m;
    q.z += f * 12.2;
    vec3 w = sin(q + ph);
    f -= abs(w.x + w.y + w.z) / (m * 6.8);
    m *= 2.0;
  }
  return f;
}

vec3 glowAt(float f, float z) {
  vec3 c = 0.5 + 0.5 * cos(f * 40.3 + z * 3.3 + vec3(1.0, 4.4, 4.0));
  return c / (0.006 + abs(f) * 0.08);
}

vec3 squash(vec3 l) {
  vec3 e = exp(-2.0 * max(l, vec3(0.0)));
  return (1.0 - e) / (1.0 + e);
}

vec3 tint(vec3 c) {
  float pk = max(c.r, max(c.g, c.b));
  vec3 w = vec3(pk) - c;
  vec3 base = clamp(
    vec3(1.0) + w.r * (uHueA - 1.0) + w.g * (uHueB - 1.0) + w.b * (uHueC - 1.0),
    0.0,
    1.0
  );
  return clamp(base + (1.0 - pk) * (uCore - 1.0), 0.0, 1.0);
}

vec4 gather(vec3 ro, vec3 rd, vec2 span, mat2 r, vec3 ph) {
  if (uVeil <= 0.0) return vec4(0.0);
  float k = max(uGrain, 0.0701);
  float ds = (span.y - span.x) / float(uSteps);
  float wl = ds * length(rd);
  float ext = -log(max(1.0 - uVeil, 0.001)) * 6.0 / max(uRadius, 0.001);
  float th = max(uSheet, 0.001);
  vec3 acc = vec3(0.0);
  float T = 1.0;
  for (int i = 0; i < 256; i++) {
    if (i >= uSteps || T < 0.002) break;
    float t = span.x + (float(i) + 0.5) * ds;
    vec3 p = shell(ro + rd * t, r, k);
    float f = lattice(p, ph);
    float d = f / th;
    float rho = exp(-d * d);
    float a = 1.0 - exp(-rho * ext * wl);
    vec3 col = tint(squash(glowAt(f, p.z) * uGlow / 120.0));
    acc += col * T * a;
    T *= 1.0 - a;
  }
  float op = 1.0 - T;
  return vec4(acc / max(op, 1e-6), op);
}

void main() {
  float m = min(uRes.x, uRes.y);
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / m;
  vec3 ro = vec3(0.0, 0.0, -uDist);
  vec3 rd = vec3(uv / uFocal, 1.0);
  float rr = dot(rd, rd);
  float tc = -dot(ro, rd) / rr;
  vec3 cp = ro + rd * tc;
  float cd = length(cp);
  float edge = max(fwidth(cd), 1e-5);
  float cover = 1.0 - smoothstep(uRadius - edge, uRadius, cd);
  float ch = uRadius * uRadius - dot(cp, cp);
  if (ch <= 0.0) {
    fragOut = vec4(0.0);
    return;
  }
  float h = sqrt(ch / rr);
  vec2 span = vec2(max(tc - h, 0.0), tc + h);
  vec3 ph = uSwell * sin(uPhaseT * vec3(0.83, 1.0, 0.67));
  vec4 v = gather(uTurn * ro, uTurn * rd, span, spinMat(uAngle), ph);
  float a = v.a * cover;
  fragOut = vec4(v.rgb * a, a);
}
`;

// Exact Ember preset & parameters from Chromatic Orb (Opaline.js)
const EMBER_CONFIG = {
  hueA: [255 / 255, 179 / 255, 107 / 255] as [number, number, number], // #FFB36B
  hueB: [160 / 255, 36 / 255, 28 / 255] as [number, number, number],   // #A0241C
  hueC: [255 / 255, 243 / 255, 226 / 255] as [number, number, number], // #FFF3E2
  core: [43 / 255, 6 / 255, 2 / 255] as [number, number, number],      // #2B0602
  bg: "#FFF9F3",
  radius: 1.0,
  zoom: 1.8,
  eyeDistance: 4.8,
  focal: 1.0,
  grain: 1.16,
  twist: 2.94,
  glow: 1.0,
  veil: 0.94,
  sheet: 0.06,
  steps: 96,
  ceiling: 1.0,
  spin: 0.19,
  drift: 0.43,
  swell: 1.59,
  response: 1.0,
  damping: 0.7,
};

type Quat = [number, number, number, number]; // [x, y, z, w]

function qMul(a: Quat, b: Quat): Quat {
  return [
    a[3] * b[0] + a[0] * b[3] + a[1] * b[2] - a[2] * b[1],
    a[3] * b[1] - a[0] * b[2] + a[1] * b[3] + a[2] * b[0],
    a[3] * b[2] + a[0] * b[1] - a[1] * b[0] + a[2] * b[3],
    a[3] * b[3] - a[0] * b[0] - a[1] * b[1] - a[2] * b[2],
  ];
}

function qNorm(q: Quat): Quat {
  const len = Math.hypot(q[0], q[1], q[2], q[3]) || 1;
  return [q[0] / len, q[1] / len, q[2] / len, q[3] / len];
}

function qAxisAngle(ax: number, ay: number, az: number, angle: number): Quat {
  const half = angle * 0.5;
  const s = Math.sin(half);
  return qNorm([ax * s, ay * s, az * s, Math.cos(half)]);
}

function qEase(cur: Quat, aim: Quat, t: number): Quat {
  const dot = cur[0] * aim[0] + cur[1] * aim[1] + cur[2] * aim[2] + cur[3] * aim[3];
  const sign = dot < 0 ? -1 : 1;
  return qNorm([
    cur[0] + (aim[0] * sign - cur[0]) * t,
    cur[1] + (aim[1] * sign - cur[1]) * t,
    cur[2] + (aim[2] * sign - cur[2]) * t,
    cur[3] + (aim[3] * sign - cur[3]) * t,
  ]);
}

function inverseTurn(q: Quat): Float32Array {
  const x = -q[0];
  const y = -q[1];
  const z = -q[2];
  const w = q[3];
  const x2 = x + x;
  const y2 = y + y;
  const z2 = z + z;
  const xx = x * x2;
  const xy = x * y2;
  const xz = x * z2;
  const yy = y * y2;
  const yz = y * z2;
  const zz = z * z2;
  const wx = w * x2;
  const wy = w * y2;
  const wz = w * z2;

  return new Float32Array([
    1 - (yy + zz),
    xy + wz,
    xz - wy,
    xy - wz,
    1 - (xx + zz),
    yz + wx,
    xz + wy,
    yz - wx,
    1 - (xx + yy),
  ]);
}

export default function PerformanceGraph() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      console.error("[PerformanceGraph] WebGL2 is not supported.");
      return;
    }

    const compileShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERT);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aCorner = gl.getAttribLocation(program, "aCorner");
    gl.enableVertexAttribArray(aCorner);
    gl.vertexAttribPointer(aCorner, 2, gl.FLOAT, false, 0, 0);

    const u = {
      uRes: gl.getUniformLocation(program, "uRes"),
      uTurn: gl.getUniformLocation(program, "uTurn"),
      uAngle: gl.getUniformLocation(program, "uAngle"),
      uPhaseT: gl.getUniformLocation(program, "uPhaseT"),
      uSwell: gl.getUniformLocation(program, "uSwell"),
      uRadius: gl.getUniformLocation(program, "uRadius"),
      uDist: gl.getUniformLocation(program, "uDist"),
      uFocal: gl.getUniformLocation(program, "uFocal"),
      uGrain: gl.getUniformLocation(program, "uGrain"),
      uTwist: gl.getUniformLocation(program, "uTwist"),
      uGlow: gl.getUniformLocation(program, "uGlow"),
      uVeil: gl.getUniformLocation(program, "uVeil"),
      uSheet: gl.getUniformLocation(program, "uSheet"),
      uHueA: gl.getUniformLocation(program, "uHueA"),
      uHueB: gl.getUniformLocation(program, "uHueB"),
      uHueC: gl.getUniformLocation(program, "uHueC"),
      uCore: gl.getUniformLocation(program, "uCore"),
      uSteps: gl.getUniformLocation(program, "uSteps"),
    };

    gl.clearColor(0, 0, 0, 0);

    let disposed = false;
    let frameId = 0;
    let visible = true;
    let reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let angle = 0;
    let phaseT = 0;
    let stamp = 0;

    let orient: Quat = [0, 0, 0, 1];
    let aim: Quat = [0, 0, 0, 1];
    let whirl: [number, number, number] = [0, 0, 0];

    let heldId: number | null = null;
    let lastX = 0;
    let lastY = 0;
    let lastMoveStamp = 0;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches;
    };
    motionQuery.addEventListener("change", onMotionChange);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, EMBER_CONFIG.ceiling);
      const width = Math.max(1, Math.round(container.clientWidth * dpr));
      const height = Math.max(1, Math.round(container.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) stamp = 0;
    });
    intersectionObserver.observe(container);

    const onPointerDown = (e: PointerEvent) => {
      if (heldId !== null) return;
      heldId = e.pointerId;
      lastX = e.clientX;
      lastY = e.clientY;
      lastMoveStamp = performance.now();
      whirl = [0, 0, 0];
      canvas.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (heldId !== e.pointerId) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dtLap = Math.max((now - lastMoveStamp) / 1000, 0.001);

      lastX = e.clientX;
      lastY = e.clientY;
      lastMoveStamp = now;

      const d = Math.hypot(dx, dy);
      if (d < 1e-4) return;

      const span = Math.max(
        200,
        Math.min(container.clientWidth, container.clientHeight)
      );
      const pace = d / (dtLap * span);
      const lift = 1 + (1.7 * pace) / (pace + 1.4);
      const turn =
        ((d * Math.PI * EMBER_CONFIG.response) / span) * lift;

      const ax = -dy / d;
      const ay = -dx / d;
      const qTurn = qAxisAngle(ax, ay, 0, turn);
      aim = qNorm(qMul(qTurn, aim));

      const rate = Math.min(turn / dtLap, 22);
      const blend = 1 - Math.exp(-85 * dtLap);
      whirl[0] += (ax * rate - whirl[0]) * blend;
      whirl[1] += (ay * rate - whirl[1]) * blend;
      whirl[2] *= 1 - blend;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (heldId !== e.pointerId) return;
      heldId = null;
      canvas.releasePointerCapture?.(e.pointerId);
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    const tick = (now: number) => {
      if (disposed) return;
      frameId = requestAnimationFrame(tick);

      if (!visible || document.hidden) {
        stamp = 0;
        return;
      }

      const dt = stamp ? Math.min(Math.max((now - stamp) / 1000, 0), 0.05) : 0;
      stamp = now;

      if (!reducedMotion) {
        angle += EMBER_CONFIG.spin * dt;
        phaseT += EMBER_CONFIG.drift * dt;
      }

      if (heldId === null && dt > 0) {
        const wLen = Math.hypot(whirl[0], whirl[1], whirl[2]);
        if (wLen > 0.001) {
          const decay = Math.exp(-EMBER_CONFIG.damping * dt);
          const inertialTurn =
            (wLen * (1 - decay)) / EMBER_CONFIG.damping;
          const qInertial = qAxisAngle(
            whirl[0] / wLen,
            whirl[1] / wLen,
            whirl[2] / wLen,
            inertialTurn
          );
          aim = qNorm(qMul(qInertial, aim));
          whirl[0] *= decay;
          whirl[1] *= decay;
          whirl[2] *= decay;
        } else {
          whirl = [0, 0, 0];
        }
      }

      if (dt > 0) {
        const easeFactor = 1 - Math.exp(-15 * dt);
        orient = qEase(orient, aim, easeFactor);
      }

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindVertexArray(vao);

      gl.uniform2f(u.uRes, canvas.width, canvas.height);
      gl.uniformMatrix3fv(u.uTurn, false, inverseTurn(orient));
      gl.uniform1f(u.uAngle, angle);
      gl.uniform1f(u.uPhaseT, phaseT);
      gl.uniform1f(u.uSwell, EMBER_CONFIG.swell);
      gl.uniform1f(u.uRadius, EMBER_CONFIG.radius);
      gl.uniform1f(
        u.uDist,
        EMBER_CONFIG.eyeDistance / EMBER_CONFIG.zoom
      );
      gl.uniform1f(u.uFocal, EMBER_CONFIG.focal);
      gl.uniform1f(u.uGrain, EMBER_CONFIG.grain);
      gl.uniform1f(u.uTwist, EMBER_CONFIG.twist);
      gl.uniform1f(u.uGlow, EMBER_CONFIG.glow);
      gl.uniform1f(u.uVeil, EMBER_CONFIG.veil);
      gl.uniform1f(u.uSheet, EMBER_CONFIG.sheet);
      gl.uniform3fv(u.uHueA, EMBER_CONFIG.hueA);
      gl.uniform3fv(u.uHueB, EMBER_CONFIG.hueB);
      gl.uniform3fv(u.uHueC, EMBER_CONFIG.hueC);
      gl.uniform3fv(u.uCore, EMBER_CONFIG.core);
      gl.uniform1i(u.uSteps, EMBER_CONFIG.steps);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    frameId = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      motionQuery.removeEventListener("change", onMotionChange);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);

      gl.deleteBuffer(vbo);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="performance-graph chromatic-orb-section"
      style={{ backgroundColor: EMBER_CONFIG.bg }}
      aria-label="Animated Ember Chromatic Orb"
    >
      <div
        className="chromatic-orb-stage"
        style={{ width: "100%", height: "100%", position: "relative" }}
      >
        <canvas
          ref={canvasRef}
          className="chromatic-orb-canvas"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            cursor: "grab",
            touchAction: "none",
          }}
          aria-label="Chromatic Orb interactive WebGL2 volumetric sphere"
        />
      </div>
    </section>
  );
}