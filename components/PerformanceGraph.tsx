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
uniform float uTime;
out vec4 fragOut;

const float R = 0.40;   // hex body radius
const float H = 0.42;   // body half length
const float T = 0.52;   // tip length

mat3 rotX(float a) { float c = cos(a), s = sin(a); return mat3(1.,0.,0., 0.,c,s, 0.,-s,c); }
mat3 rotY(float a) { float c = cos(a), s = sin(a); return mat3(c,0.,-s, 0.,1.,0., s,0.,c); }
mat3 rotZ(float a) { float c = cos(a), s = sin(a); return mat3(c,s,0., -s,c,0., 0.,0.,1.); }

float sdCrystal(vec3 p) {
  p.x -= 0.14 * smoothstep(0.0, 1.0, p.y);
  p.z += 0.06 * smoothstep(0.0, 1.0, -p.y);
  vec2 q = abs(p.xz);
  float hr = max(dot(q, vec2(0.8660254, 0.5)), q.y);
  float body = hr - R;
  float tips = (hr / R + (abs(p.y) - H) / T - 1.0) * 0.32;
  float d = max(body, tips);
  d = max(d, dot(p, normalize(vec3( 0.55,  0.62,  0.35))) - 0.64);
  d = max(d, dot(p, normalize(vec3(-0.50, -0.70,  0.40))) - 0.62);
  d = max(d, dot(p, normalize(vec3(-0.30,  0.50, -0.75))) - 0.37);
  d = max(d, dot(p, normalize(vec3( 0.80, -0.20, -0.45))) - 0.39);
  return d * 0.8;
}

vec3 calcNormal(vec3 p) {
  const vec2 k = vec2(1.0, -1.0);
  const float e = 0.0015;
  return normalize(
    k.xyy * sdCrystal(p + k.xyy * e) +
    k.yyx * sdCrystal(p + k.yyx * e) +
    k.yxy * sdCrystal(p + k.yxy * e) +
    k.xxx * sdCrystal(p + k.xxx * e));
}

vec3 envMap(vec3 d) {
  float y = d.y * 0.5 + 0.5;
  vec3 col = mix(vec3(0.02, 0.025, 0.04), vec3(0.20, 0.23, 0.31), y);
  col += vec3(1.00, 0.96, 0.90) * 3.4 * smoothstep(0.78, 0.96, dot(d, normalize(vec3( 0.5,  0.7,  0.5))));
  col += vec3(0.50, 0.70, 1.00) * 2.8 * smoothstep(0.74, 0.94, dot(d, normalize(vec3(-0.8,  0.2,  0.5))));
  col += vec3(1.00, 0.52, 0.18) * 3.0 * smoothstep(0.80, 0.97, dot(d, normalize(vec3( 0.2, -0.6, -0.8))));
  col += vec3(1.00)             * 2.4 * smoothstep(0.94, 0.995, dot(d, normalize(vec3(-0.3,  0.9, -0.3))));
  col += vec3(0.80, 0.45, 1.00) * 2.0 * smoothstep(0.86, 0.98, dot(d, normalize(vec3( 0.9, -0.1, -0.3))));
  col += vec3(0.30, 1.00, 0.80) * 1.6 * smoothstep(0.90, 0.99, dot(d, normalize(vec3(-0.2, -0.3,  0.9))));
  col += vec3(0.90, 0.60, 1.00) * 0.45 * pow(0.5 + 0.5 * sin(d.x * 5.0 + d.z * 3.0), 6.0);
  col += vec3(1.00, 0.85, 0.60) * 0.40 * pow(0.5 + 0.5 * sin(d.y * 7.0 - d.x * 2.0), 8.0);
  return col;
}

// distance travelled inside the crystal until the ray leaves it
float exitDist(vec3 ro, vec3 rd) {
  float t = 0.02;
  for (int i = 0; i < 30; i++) {
    float d = -sdCrystal(ro + rd * t);
    if (d < 0.001) break;
    t += max(d, 0.01);
  }
  return t;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y * 2.0;

  vec3 ro = vec3(0.0, 0.0, -4.0);
  vec3 rd = normalize(vec3(uv, 3.8));

  // slow tumble
  mat3 rot = rotZ(0.42) * rotX(0.25 + 0.10 * sin(uTime * 0.35)) * rotY(uTime * 0.45);
  mat3 inv = transpose(rot);
  vec3 roL = inv * ro;
  vec3 rdL = inv * rd;

  // bounding sphere early-out
  float b = dot(roL, rdL);
  float c = dot(roL, roL) - 1.35 * 1.35;
  float disc = b * b - c;
  if (disc < 0.0) {
    fragOut = vec4(0.0);
    return;
  }

  float t = max(-b - sqrt(disc), 0.0);
  bool hit = false;
  for (int i = 0; i < 64; i++) {
    float d = sdCrystal(roL + rdL * t);
    if (d < 0.0008) { hit = true; break; }
    t += d;
    if (t > 8.0) break;
  }
  if (!hit) {
    fragOut = vec4(0.0);
    return;
  }

  vec3 p = roL + rdL * t;
  vec3 n = calcNormal(p);

  float cosI = clamp(dot(-rdL, n), 0.0, 1.0);
  float fres = 0.04 + 0.96 * pow(1.0 - cosI, 5.0);

  // refraction with chromatic dispersion
  vec3 ior = vec3(1.46, 1.55, 1.67);
  vec3 refr = vec3(0.0);
  for (int ch = 0; ch < 3; ch++) {
    float eta = 1.0 / ior[ch];
    vec3 dIn = normalize(refract(rdL, n, eta));
    float dist = exitDist(p - n * 0.004, dIn);
    vec3 pe = p + dIn * dist;
    vec3 ne = -calcNormal(pe);
    vec3 dOut = refract(dIn, ne, ior[ch]);
    if (dot(dOut, dOut) < 0.5) {
      // total internal reflection: bounce once more
      dIn = reflect(dIn, ne);
      dist = exitDist(pe, dIn);
      pe = pe + dIn * dist;
      ne = -calcNormal(pe);
      dOut = refract(dIn, ne, ior[ch]);
      if (dot(dOut, dOut) < 0.5) dOut = reflect(dIn, ne);
    }
    vec3 e = envMap(rot * dOut);
    refr[ch] = e[ch];
  }

  vec3 refl = envMap(rot * reflect(rdL, n));

  vec3 col = refr * (1.0 - fres) * vec3(0.92, 0.96, 1.0) + refl * fres * 1.15;
  col = 1.0 - exp(-col * 1.25);
  col = pow(col, vec3(1.12));

  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  float alpha = clamp(0.58 + 0.50 * lum + 0.6 * fres, 0.0, 1.0);

  fragOut = vec4(col * alpha, alpha);
}
`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
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
}

export default function PerformanceGraph() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
    });

    if (!gl) {
      console.error("[PerformanceGraph] WebGL2 is not supported.");
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;

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
      gl.STATIC_DRAW,
    );

    const aCorner = gl.getAttribLocation(program, "aCorner");
    gl.enableVertexAttribArray(aCorner);
    gl.vertexAttribPointer(aCorner, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");

    gl.clearColor(0, 0, 0, 0);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    let disposed = false;
    let visible = true;
    let frameId = 0;
    let last = 0;
    let time = 1.2; // starting pose, also the still frame for reduced motion
    let needsDraw = true;
    let ready = false;

    const resize = () => {
      // at least 1.5x for clean edges, capped lower on phones for speed
      const dpr = window.devicePixelRatio || 1;
      const scale = Math.min(Math.max(dpr, 1.5), coarsePointer ? 1.5 : 2);
      const size = Math.max(1, Math.round(stage.clientWidth * scale));
      if (canvas.width !== size || canvas.height !== size) {
        canvas.width = size;
        canvas.height = size;
        gl.viewport(0, 0, size, size);
        needsDraw = true;
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);
    resize();

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      last = 0;
    });
    intersectionObserver.observe(stage);

    const draw = (now: number) => {
      if (disposed) return;
      frameId = requestAnimationFrame(draw);

      if (!visible || document.hidden) {
        last = 0;
        return;
      }

      if (reduceMotion) {
        if (!needsDraw) return;
      } else {
        const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
        last = now;
        time += dt;
      }

      needsDraw = false;

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!ready) {
        ready = true;
        stage.dataset.ready = "true";
      }
    };

    frameId = requestAnimationFrame(draw);

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      gl.deleteBuffer(vbo);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="crystal-stage"
      role="img"
      aria-label="Rotating glass crystal"
    >
      <canvas ref={canvasRef} className="crystal-canvas" />
    </div>
  );
}