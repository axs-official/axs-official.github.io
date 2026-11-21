'use client';
import { FaBriefcase, FaTag, FaLanguage, FaCameraRetro, FaMapMarkerAlt, FaClock, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const stats = [
  { value: "150+", label: "Projects shipped", icon: <FaBriefcase className="h-4 w-4" /> },
  { value: "36", label: "Modules & tools", icon: <FaTag className="h-4 w-4" /> },
  { value: "8", label: "Languages", icon: <FaLanguage className="h-4 w-4" /> },
  { value: "12+", label: "Interfaces", icon: <FaCameraRetro className="h-4 w-4" /> },
];

const details = [
  { label: "Location", value: "Algeria", icon: <FaMapMarkerAlt className="h-4 w-4" /> },
  { label: "Timezone", value: "Africa/Algiers (UTC+1)", icon: <FaClock className="h-4 w-4" /> },
  { label: "Handles", value: `@axs-official`, icon: <FaGithub className="h-4 w-4" /> },
];

export function AboutCards() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="card text-center"
          >
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-[#6AAED4]">
              {s.icon}
            </div>
            <p className="mt-3 text-2xl font-bold text-white">{s.value}</p>
            <p className="mt-0.5 text-xs text-white/45 uppercase tracking-[0.16em]">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {details.map((d, i) => (
          <motion.div
            key={d.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.06 }}
            className="card"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-[#6AAED4]">
                {d.icon}
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">{d.label}</p>
                <p className="text-sm text-white/85">{d.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
