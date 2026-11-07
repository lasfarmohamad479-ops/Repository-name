"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ScrollText, Loader2, ShieldCheck } from "lucide-react";

type Hadith = { id: number; number: number; chapter: string; text: string };

export default function HadithOfDay() {
  const [hadith, setHadith] = useState<Hadith | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/api/hadiths?random=1")
      .then((r) => r.json())
      .then((d) => {
        if (alive && d.hadith) setHadith(d.hadith);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="glass luxury-frame rounded-2xl p-7 md:p-10 relative overflow-hidden"
    >
      <div className="absolute -bottom-24 -left-20 w-56 h-56 rounded-full bg-emerald-glow/8 blur-3xl" />
      <div className="flex items-center gap-3 mb-6">
        <span className="w-10 h-10 rounded-xl grid place-items-center bg-gold-500/10 border border-gold-500/25 text-gold-400">
          <ScrollText size={18} />
        </span>
        <div className="flex-1">
          <h3 className="font-kufi font-bold text-lg text-gold-300">
            حَدِيثُ اليَوم
          </h3>
          <p className="text-xs text-cream-500">
            من صحيح البخاري — الباب: {hadith?.chapter || "…"}
          </p>
        </div>
        <span className="hidden sm:flex items-center gap-1.5 text-[11px] text-emerald-glow border border-emerald-glow/25 bg-emerald-glow/5 rounded-full px-3 py-1.5">
          <ShieldCheck size={13} /> صحيح البخاري
        </span>
      </div>

      {hadith ? (
        <>
          <p className="font-amiri text-[1.15rem] md:text-xl leading-[2.3] text-cream-100">
            {hadith.text.length > 600
              ? hadith.text.slice(0, 600) + "…"
              : hadith.text}
          </p>
          <div className="ornament-divider mt-8">
            <span className="text-gold-500/60 text-sm">
              حديث رقم {hadith.number} — صحيح البخاري
            </span>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center min-h-[180px]">
          <Loader2 className="animate-spin text-gold-400" />
        </div>
      )}
    </motion.div>
  );
}
