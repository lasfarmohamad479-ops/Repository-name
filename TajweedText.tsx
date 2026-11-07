"use client";

import { useMemo } from "react";

// يعرض النص القرآني بعلامات التجويد الملوّنة (النص موثوق من Quran.com)
export default function TajweedText({
  text,
  size = "text-2xl",
  className = "",
}: {
  text: string;
  size?: string;
  className?: string;
}) {
  const html = useMemo(() => {
    return text
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/&lt;tajweed class=([a-z_]+)&gt;/g, '<span class="$1">')
      .replace(/&lt;\/tajweed&gt;/g, "</span>")
      .replace(/&lt;span class=end&gt;/g, '<span class="end ayah-end">')
      .replace(/&lt;\/span&gt;/g, "</span>");
  }, [text]);

  return (
    <span
      className={`tajweed-text font-quran leading-[2.4] ${size} ${className}`}
      dir="rtl"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

// نص قرآني عادي بدون تجويد
export function PlainQuranText({
  text,
  size = "text-2xl",
  className = "",
}: {
  text: string;
  size?: string;
  className?: string;
}) {
  return (
    <span
      className={`font-quran leading-[2.4] ${size} ${className}`}
      dir="rtl"
    >
      {text}
    </span>
  );
}
