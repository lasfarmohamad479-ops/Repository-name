"use client";

import { useCallback, useEffect, useState } from "react";

export function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let vid = localStorage.getItem("noor-visitor-id");
  if (!vid) {
    vid =
      "v_" +
      Math.random().toString(36).slice(2, 10) +
      Date.now().toString(36);
    localStorage.setItem("noor-visitor-id", vid);
  }
  return vid;
}

export type Bookmark = {
  id: number;
  kind: string;
  ref: string;
  label: string;
  body: string;
  createdAt: string;
};

export function useBookmarks() {
  const [items, setItems] = useState<Bookmark[]>([]);
  const [refs, setRefs] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const vid = getVisitorId();
    if (!vid) return;
    try {
      const res = await fetch("/api/bookmarks", {
        headers: { "x-visitor-id": vid },
      });
      const data = await res.json();
      const list: Bookmark[] = data.bookmarks || [];
      setItems(list);
      setRefs(new Set(list.map((b) => `${b.kind}:${b.ref}`)));
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const toggle = useCallback(
    async (kind: string, ref: string, label: string, body: string) => {
      const vid = getVisitorId();
      try {
        const res = await fetch("/api/bookmarks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-visitor-id": vid,
          },
          body: JSON.stringify({ kind, ref, label, body }),
        });
        const data = await res.json();
        await refresh();
        return !!data.saved;
      } catch {
        return false;
      }
    },
    [refresh]
  );

  const isSaved = useCallback(
    (kind: string, ref: string) => refs.has(`${kind}:${ref}`),
    [refs]
  );

  const remove = useCallback(
    async (id: number) => {
      const vid = getVisitorId();
      await fetch(`/api/bookmarks?id=${id}`, {
        method: "DELETE",
        headers: { "x-visitor-id": vid },
      });
      await refresh();
    },
    [refresh]
  );

  return { items, loading, toggle, isSaved, remove, refresh };
}
