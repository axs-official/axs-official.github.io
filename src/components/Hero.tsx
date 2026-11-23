"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Billboard, Stars } from "@react-three/drei";
import * as THREE from "three";
import {
  siCplusplus,
  siDocker,
  siFigma,
  siGit,
  siGithubactions,
  siJavascript,
  siLinux,
  siNextdotjs,
  siNodedotjs,
  siPython,
  siReact,
  siRust,
  siSqlite,
  siTailwindcss,
  siThreedotjs,
  siTypescript,
} from "simple-icons";
import { site } from "@/data/site";

type ToolIconData = {
  icon: { title: string; path: string; hex: string };
  radius: number;
  phase: number;
  speed: number;
  size: number;
};

const toolIcons: ToolIconData[] = [
  { icon: siPython, radius: 2.12, phase: 0, speed: 0.13, size: 0.54 },
  { icon: siTypescript, radius: 1.99, phase: 0.9, speed: -0.11, size: 0.48 },
  { icon: siReact, radius: 2.1, phase: 1.8, speed: 0.1, size: 0.52 },
  { icon: siNextdotjs, radius: 2.02, phase: 2.7, speed: -0.13, size: 0.46 },
  { icon: siTailwindcss, radius: 2.12, phase: 3.6, speed: 0.11, size: 0.5 },
  { icon: siNodedotjs, radius: 1.98, phase: 4.5, speed: -0.09, size: 0.48 },
  { icon: siGit, radius: 2.08, phase: 5.4, speed: 0.085, size: 0.54 },
  { icon: siJavascript, radius: 2.34, phase: 0.45, speed: 0.115, size: 0.38 },
  { icon: siThreedotjs, radius: 2.22, phase: 1.35, speed: -0.1, size: 0.38 },
  { icon: siGithubactions, radius: 2.4, phase: 2.25, speed: 0.075, size: 0.36 },
  { icon: siLinux, radius: 2.3, phase: 3.15, speed: -0.12, size: 0.4 },
  { icon: siSqlite, radius: 2.36, phase: 4.05, speed: 0.09, size: 0.38 },
  { icon: siRust, radius: 2.26, phase: 4.95, speed: -0.095, size: 0.38 },
  { icon: siCplusplus, radius: 2.4, phase: 5.85, speed: 0.08, size: 0.36 },
  { icon: siFigma, radius: 2.18, phase: 0.3, speed: -0.105, size: 0.38 },
  { icon: siDocker, radius: 2.32, phase: 1.2, speed: 0.1, size: 0.38 },
];

function brandColor(hex: string) {
  const value = Number.parseInt(hex, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  // Near-black marks (Next.js, Three.js) vanish on the dark tile, so they stay light.
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  if (luminance < 0.06) return "#f2f2f2";
  // Dark brand colours (SQLite, C++) get lifted so they still read as their own colour.
  if (luminance < 0.22) {
    const lift = 0.55;
    const toChannel = (channel: number) =>
      Math.round(channel + (255 - channel) * lift)
        .toString(16)
        .padStart(2, "0");
    return `#${toChannel(r)}${toChannel(g)}${toChannel(b)}`;
  }
  return `#${hex}`;
}

function createToolTexture(icon: { path: string; hex: string }, anisotropy: number) {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const inset = 24;
  const tile = size - inset * 2;
  const color = brandColor(icon.hex);

  ctx.beginPath();
  ctx.roundRect(inset, inset, tile, tile, 116);
  ctx.fillStyle = "rgba(11, 12, 17, 0.88)";
  ctx.fill();

  // Soft wash of the logo colour so the plate reads as part of the icon.
  const wash = ctx.createRadialGradient(size / 2, size / 2, 8, size / 2, size / 2, tile / 2);
  wash.addColorStop(0, `${color}30`);
  wash.addColorStop(1, `${color}00`);
  ctx.fillStyle = wash;
  ctx.fill();

  ctx.lineWidth = 7;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
  ctx.stroke();

  const logo = 300;
  const scale = logo / 24;
  ctx.save();
  ctx.translate((size - logo) / 2, (size - logo) / 2);
  ctx.scale(scale, scale);
  ctx.fillStyle = color;
  ctx.fill(new Path2D(icon.path));
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = anisotropy;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.generateMipmaps = true;
  return texture;
}

function ToolIcon({ icon, radius, phase, speed, size }: ToolIconData) {
  const ref = useRef<THREE.Group>(null);
  const gl = useThree((state) => state.gl);
  const texture = useMemo(
    () =>
      typeof document === "undefined"
        ? null
        : createToolTexture(icon, gl.capabilities.getMaxAnisotropy()),
    [icon, gl],
  );

  useEffect(() => () => texture?.dispose(), [texture]);

  useFrame((state) => {
    if (!ref.current) return;
    const angle = state.clock.elapsedTime * speed + phase;
    ref.current.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      Math.sin(angle * 1.3) * 0.28,
    );
  });

  if (!texture) return null;

  return (
    <Billboard ref={ref} follow>
      <mesh>
        <planeGeometry args={[size, size]} />
        <meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
      </mesh>
    </Billboard>
  );
}

function ToolOrbit() {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  if (compact) return null;

  return (
    <group>
      {toolIcons.map((tool) => (
        <ToolIcon key={tool.icon.title} {...tool} />
      ))}
    </group>
  );
}

function Planet() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.1;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1;
    }
    if (ring.current) {
      ring.current.rotation.z += delta * 0.04;
    }
  });

  return (
    <group ref={group} rotation={[0.42, 0, 0.14]}>
      <mesh>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          color="#0f0f0f"
          roughness={0.48}
          metalness={0.72}
          emissive="#262626"
          emissiveIntensity={0.55}
        />
      </mesh>
      <mesh scale={1.004}>
        <sphereGeometry args={[1.5, 30, 30]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.11} />
      </mesh>
      <group ref={ring} rotation={[Math.PI / 2.25, 0, 0]}>
        <mesh>
          <ringGeometry args={[1.98, 2.01, 128]} />
          <meshBasicMaterial color="#3b63f6" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[0.3, 0, 0.18]}>
          <ringGeometry args={[2.28, 2.3, 128]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.22} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[-0.4, 0, -0.1]}>
          <ringGeometry args={[2.62, 2.64, 128]} />
          <meshBasicMaterial color="#e8e8e8" transparent opacity={0.1} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

function Scene() {
  const size = useThree((state) => state.size);
  // Visible half-width in world units at the hero camera (height is 5.75 units).
  const halfWidth = (size.width / size.height) * 2.875;
  const scale = Math.min(1, (halfWidth - 0.15) / 2.66);

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[4, 5, 6]} intensity={34} color="#ffffff" />
      <pointLight position={[-5, -2, 3]} intensity={15} color="#7d95ff" />
      <pointLight position={[0, -4, -5]} intensity={9} color="#8a8a8a" />
      <Stars radius={80} depth={55} count={2600} factor={4} saturation={0} fade speed={0.5} />
      <group scale={scale}>
        <Planet />
        <ToolOrbit />
      </group>
    </>
  );
}

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-y-0 right-[-14%] h-full w-[118%] opacity-60 lg:right-[-1%] lg:w-[53%] lg:opacity-100">
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 10.5], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Scene />
        </Canvas>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#0a0a0a]" />

      <div className="shell relative z-10 flex min-h-[100svh] flex-col justify-center pb-24 pt-32">
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ staggerChildren: 0.1, delayChildren: 0.05 }}
          className="max-w-[38rem]"
        >
          <motion.p variants={rise} transition={{ duration: 0.6 }} className="eyebrow">
            Hello, I&apos;m
          </motion.p>

          <motion.h1
            variants={rise}
            transition={{ duration: 0.8 }}
            className="mt-5 text-[clamp(3.4rem,11vw,7rem)] font-bold leading-[0.9] tracking-[-0.055em]"
          >
            <span className="grad-text">axs</span>
          </motion.h1>

          <motion.p
            variants={rise}
            transition={{ duration: 0.7 }}
            className="mt-7 max-w-[30ch] text-[clamp(1.15rem,2.6vw,1.6rem)] font-medium leading-[1.35] tracking-[-0.02em]"
          >
            I build tools that don&apos;t watch you.
          </motion.p>

          <motion.p variants={rise} transition={{ duration: 0.7 }} className="lede mt-5 max-w-[46ch]">
            Privacy-first software and automations, made because the closed version was paid,
            locked down, or quietly collecting data. Arabic and English, from Algeria.
          </motion.p>

          <motion.div variants={rise} transition={{ duration: 0.7 }} className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/work" className="btn btn--solid">
              Projects <span aria-hidden>→</span>
            </Link>
            <a href={site.github} target="_blank" rel="noreferrer" className="btn">
              GitHub ↗
            </a>
          </motion.div>

          <motion.div
            variants={rise}
            transition={{ duration: 0.7 }}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-dim"
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {site.availability}
            </span>
            <span>{site.location}</span>
            <span>{site.timezone}</span>
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 hidden justify-center md:flex">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-dim">Scroll</span>
          <span className="relative block h-10 w-px overflow-hidden bg-[rgba(242,237,228,0.16)]">
            <span
              className="absolute inset-x-0 top-0 h-4 bg-accent"
              style={{ animation: "scroll-cue 2.4s ease-in-out infinite" }}
            />
          </span>
        </div>
      </div>
    </section>
  );
}
