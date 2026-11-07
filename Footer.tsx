import Link from "next/link";
import { BookOpen, ScrollText, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-gold-500/15 bg-night-900/60">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-l from-transparent via-gold-500/50 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-kufi text-2xl gold-text mb-4">نُورُ اليَقين</h3>
            <p className="text-cream-300/75 text-sm leading-7 max-w-xs">
              منصة إسلامية شاملة: القرآن الكريم كاملاً بالرسم العثماني مع علامات
              التجويد الملوّنة، ومائة حديث وأكثر من صحيح البخاري، والأذكار من
              حصن المسلم، ومواقيت الصلاة والسبحة الإلكترونية.
            </p>
          </div>
          <div>
            <h4 className="font-kufi text-lg text-gold-300 mb-4">أقسام الموقع</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/quran" className="flex items-center gap-2 text-cream-300/80 hover:text-gold-300 transition-colors">
                  <BookOpen size={15} className="text-gold-500" /> القرآن الكريم بالتجويد
                </Link>
              </li>
              <li>
                <Link href="/hadith" className="flex items-center gap-2 text-cream-300/80 hover:text-gold-300 transition-colors">
                  <ScrollText size={15} className="text-gold-500" /> صحيح البخاري
                </Link>
              </li>
              <li>
                <Link href="/tasbih" className="flex items-center gap-2 text-cream-300/80 hover:text-gold-300 transition-colors">
                  <Heart size={15} className="text-gold-500" /> السبحة والأذكار
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-kufi text-lg text-gold-300 mb-4">المصادر</h4>
            <ul className="space-y-2.5 text-sm text-cream-300/80 leading-7">
              <li>• المصحف: نص قرآني بالرسم العثماني وضعت علامات التجويد من قِبل متخصصين — Quran.com</li>
              <li>• الأحاديث: صحيح البخاري للإمام محمد بن إسماعيل البخاري</li>
              <li>• الأذكار: كتاب حصن المسلم للشيخ سعيد بن علي بن وهف القحطاني</li>
              <li>• مواقيت الصلاة: تُحسب فلكياً بمعادلات معتمدة عالمياً</li>
            </ul>
          </div>
        </div>
        <div className="ornament-divider mt-12 mb-6">
          <span className="font-amiri text-gold-500/70 text-lg">صَدَقَ اللَّهُ العَظِيم</span>
        </div>
        <p className="text-center text-cream-500/70 text-xs">
          نُورُ اليَقين — «وَذَكِّرْ فَإِنَّ الذِّكْرَىٰ تَنفَعُ الْمُؤْمِنِينَ» [الذاريات: ٥٥]
        </p>
      </div>
    </footer>
  );
}
