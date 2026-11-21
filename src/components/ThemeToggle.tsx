'use client';
import { useEffect, useState } from "react";
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const toggle = () => {
    const next = document.documentElement.classList.toggle("dark");
    try { localStorage.setItem("axs-theme", next ? "dark" : "light"); } catch {}
  };
  if (!mounted) return <button className="h-9 w-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center" aria-label="Toggle theme" />;
  try { if (localStorage.getItem("axs-theme") === "light") document.documentElement.classList.add("dark"); } catch {}
  return (
    <button
      onClick={toggle}
      className="h-9 w-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transition hover:bg-white/10"
      aria-label="Toggle theme"
    >
      {document.documentElement.classList.contains("dark") ? (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinejoin="round"/></svg>
      ) : (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round"/></svg>
      )}
    </button>
  );
}
