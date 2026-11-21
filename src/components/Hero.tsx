'use client';
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Ring } from "@react-three/drei";
import { FaGithub, FaMailBulk } from "react-icons/fa";

function SphereWave() {
  const mesh = useRef<any>(null);
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.015;
    }
  });
  return (
    <Sphere
      ref={mesh}
      args={[1.4, 64, 64]}
      scale={[1, 1, 1]}
    >
      <meshStandardMaterial color="#6AAED4" metalness={0.35} roughness={0.25} />
    </Sphere>
  );
}

function Rings() {
  const renders = useRef<any>(null);
  useFrame((state) => {
    if (renders.current) {
      renders.current.rotation.y += 0.012;
      renders.current.rotation.x += 0.007;
    }
  });
  return (
    <group ref={renders}>
      <Sphere args={[2.5, 32, 32]}>
        <meshStandardMaterial color="#05050c" roughness={1} metalness={0} />
      </Sphere>
      <Ring args={[2.5, 4.2, 64]}>
        <lineBasicMaterial color="#6AAED4" transparent opacity={0.45} />
      </Ring>
      <Ring args={[2.5, 3.3, 64]} rotation={[0, 1, 0]}>
        <lineBasicMaterial color="#6AAED4" transparent opacity={0.28} />
      </Ring>
      <Ring args={[2.9, 3.6, 64]} rotation={[1, 0, 0]}>
        <lineBasicMaterial color="#6AAED4" transparent opacity={0.2} />
      </Ring>
    </group>
  );
}

export function Hero() {
  const [stars, setStars] = useState<number>(260);
  useEffect(() => {
    const ids = Array.from({ length: stars }, (_, i) =>
      window.requestAnimationFrame(() => {})
    );
    return () => ids.forEach((id) => window.cancelAnimationFrame(id));
  }, []);
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 40%, rgba(106,174,212,0.18) 0%, transparent 60%)",
        }}
      />
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.25} />
        <pointLight position={[2, 4, 3]} color="#6AAED4" intensity={1.2} />
        <Rings />
        <SphereWave />
      </Canvas>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="inline-block rounded-full border border-[#6AAED4]/30 bg-[#6AAED4]/10 px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] uppercase text-[#6AAED4]"
        >
          Independent Systems Studio
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 text-5xl sm:text-7xl md:text-8xl font-bold leading-[1.02] tracking-tight"
        >
          <span className="gradient-text">A-XS</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-4 max-w-xl text-base sm:text-lg text-white/60 leading-relaxed"
        >
          I build automation, AI-assisted tools, and interfaces — learning in public
          from Algeria.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="https://github.com/axs-official"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:border-white/20"
          >
            <FaGithub className="h-4 w-4" /> GitHub
          </a>
          <a
            href="mailto:axs.official@gmail.com"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:border-white/20"
          >
            <FaMailBulk className="h-4 w-4" /> Contact
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/35"
      >
        Systems, interfaces & automation
      </motion.div>
    </div>
  );
}
