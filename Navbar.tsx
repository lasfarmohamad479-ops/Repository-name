"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ScrollText,
  Sparkles,
  HeartHandshake,
  Hash,
  Moon,
  Star,
  Menu,
  X,
  Home,
} from "lucide-react";

const links = [
  { href: "/", label: "الرئيسية", icon: Home },
  { href: "/quran", label: "القرآن الكريم", icon: BookOpen },
  { href: "/tajweed", label: "أحكام التجويد", icon: Sparkles },
  { href: "/hadith", label: "صحيح البخاري", icon: ScrollText },
  { href: "/adhkar", label: "الأذكار", icon: HeartHandshake },
  { href: "/tasbih", label: "السبحة", icon: Hash },
  { href: "/prayers", label: "مواقيت الصلاة", icon: Moon },
  { href: "/asma", label: "أسماء الله الحسنى", icon: Star },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-night-950/85 backdrop-blur-xl border-b border-gold-500/15 py-2.5"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <span className="relative w-11 h-11 grid place-items-center">
              <svg viewBox="0 0 44 44" className="absolute inset-0 w-full h-full animate-spin-slow">
                <defs>
                  <linearGradient id="nv-g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#d4af37" />
                    <stop offset="100%" stopColor="#2dd4a7" />
                  </linearGradient>
                </defs>
                <path
                  d="M22 2l4.5 6.6 7.4-2.3 1.2 7.7 7.4 2.4-3.5 6.9 5.2 5.9-6.5 4.1.7 7.8-7.7-.2-4 6.8-6.2-4.9-6.2 4.9-4-6.8-7.7.2.7-7.8L.5 29.2l5.2-5.9-3.5-6.9 7.4-2.4 1.2-7.7 7.4 2.3z"
                  fill="none"
                  stroke="url(#nv-g)"
                  strokeWidth="1.4"
                  opacity="0.9"
                />
              </svg>
              <span className="font-kufi text-xl gold-text">ن</span>
            </span>
            <span className="leading-tight">
              <span className="block font-kufi font-bold text-lg text-cream-100 group-hover:text-gold-300 transition-colors">
                نُورُ اليَقين
              </span>
              <span className="block text-[11px] text-cream-500">قرآن • سنة • ذكر</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative px-3.5 py-2 rounded-xl text-[13.5px] font-semibold transition-all duration-300 ${
                    active
                      ? "text-gold-300 bg-gold-500/10"
                      : "text-cream-300/80 hover:text-cream-100 hover:bg-white/5"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl border border-gold-500/30 bg-gold-500/5"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </Link>
              );
            })}
          </nav>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden w-11 h-11 grid place-items-center rounded-xl glass gold-border text-gold-300"
            aria-label="القائمة"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-3 top-[72px] z-50 lg:hidden glass-strong rounded-2xl p-3 shadow-2xl"
          >
            <div className="grid grid-cols-2 gap-2">
              {links.map((l) => {
                const Icon = l.icon;
                const active = pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                      active
                        ? "text-gold-300 bg-gold-500/10 border border-gold-500/25"
                        : "text-cream-300/85 hover:bg-white/5"
                    }`}
                  >
                    <Icon size={17} className="text-gold-400" />
                    {l.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
