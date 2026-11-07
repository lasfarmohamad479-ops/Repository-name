"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote, Loader2 } from "lucide-react";
import TajweedText from "./TajweedText";

type Chapter = { n: number; name: string; ayahs: number; type: string };

type PickedAyah = {
  text: string;
  surah: string;
  ayahNo: number;
};

export default function VerseOfDay() {
  const [ayah, setAyah] = useState<PickedAyah | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const [chRes, qRes] = await Promise.all([
        fetch("/data/chapters.json").then((r) => r.json()) as Promise<Chapter[]>,
        fetch("/data/quran-tajweed.json").then((r) => r.json()) as Promise<
          { n: number; ayahs: string[] }[]
        >,
      ]);
      // آية اليوم: اختيار حتمي حسب التاريخ
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 0);
      const dayOfYear = Math.floor(
        (now.getTime() - start.getTime()) / 86400000
      );
      const ch = chParts(chRes);
      const idx = dayOfYear % ch.total;
      let acc = 0;
      let picked: PickedAyah = { text: "", surah: "", ayahNo: 1 };
      for (const c of chRes) {
        const list = qRes[c.n - 1]?.ayahs || [];
        if (idx < acc + c.ayahs && list.length) {
          const i = idx - acc;
          picked = { text: list[i], surah: c.name, ayahNo: i + 1 };
          break;
        }
        acc += c.ayahs;
      }
      if (alive) setAyah(picked);
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (!ayah) {
    return (
      <div className="glass luxury-frame rounded-2xl p-8 flex items-center justify-center min-h-[220px]">
        <Loader2 className="animate-spin text-gold-400" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass luxury-frame rounded-2xl p-7 md:p-10 relative overflow-hidden"
    >
      <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-gold-500/8 blur-3xl" />
      <div className="flex items-center gap-3 mb-6">
        <span className="w-10 h-10 rounded-xl grid place-items-center bg-emerald-glow/10 border border-emerald-glow/25 text-emerald-glow">
          <Quote size={18} />
        </span>
        <div>
          <h3 className="font-kufi font-bold text-lg text-gold-300">آيَةُ اليَوم</h3>
          <p className="text-xs text-cream-500">
            سورة {ayah.surah} — الآية {ayah.ayahNo}
          </p>
        </div>
      </div>
      <TajweedText text={ayah.text} size="text-[1.7rem] md:text-3xl" />
      <div className="ornament-divider mt-8">
        <span className="text-gold-500/60 text-sm">سورة {ayah.surah}</span>
      </div>
    </motion.div>
  );
}

function chParts(chapters: Chapter[]) {
  return { total: chapters.reduce((a, c) => a + c.ayahs, 0) };
}
