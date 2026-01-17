"use client";

import React from "react";

export type Theme =
  | "auth"
  | "home"
  | "journal"
  | "tarot"
  | "rituals"
  | "library"
  | "charts"
  | "horoscope"
  | "pricing"
  | "account"
  | "success";

const THEMES: Record<Theme, { bg: string; glow: string; title: string }> = {
  auth: {
    bg: "from-ink via-smoke to-ink",
    glow: "bg-ember/10",
    title: "Enter",
  },
  home: {
    bg: "from-ink via-[#1b1422] to-[#241a2d]",
    glow: "bg-ivory/8",
    title: "Threshold",
  },
  journal: {
    bg: "from-[#120e18] via-[#1c1426] to-[#140f1b]",
    glow: "bg-ember/10",
    title: "Journal",
  },
  tarot: {
    bg: "from-[#0f0b14] via-[#1a1024] to-[#0f0b14]",
    glow: "bg-ivory/10",
    title: "Tarot",
  },
  rituals: {
    bg: "from-[#0f1214] via-[#142025] to-[#0f1214]",
    glow: "bg-ember/10",
    title: "Rituals",
  },
  library: {
    bg: "from-[#0f1017] via-[#151a2b] to-[#0f1017]",
    glow: "bg-ivory/10",
    title: "Library",
  },
  charts: {
    bg: "from-[#0b1014] via-[#111c24] to-[#0b1014]",
    glow: "bg-ember/10",
    title: "Charts",
  },
  horoscope: {
    bg: "from-[#0c0e16] via-[#19112b] to-[#0c0e16]",
    glow: "bg-ivory/10",
    title: "Horoscope",
  },
  pricing: {
    bg: "from-[#101019] via-[#1a1424] to-[#101019]",
    glow: "bg-ember/10",
    title: "Upgrade",
  },
  account: {
    bg: "from-[#0f0f12] via-[#171422] to-[#0f0f12]",
    glow: "bg-ivory/10",
    title: "Account",
  },
  success: {
    bg: "from-[#0f0b14] via-[#1b1628] to-[#0f0b14]",
    glow: "bg-ember/10",
    title: "Success",
  },
};

export default function PageWrap({
  theme,
  children,
}: {
  theme: Theme;
  children: React.ReactNode;
}) {
  const t = THEMES[theme];

  return (
    <div className={`relative min-h-screen bg-gradient-to-b ${t.bg}`}>
      {/* soft glow */}
      <div
        className={`pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full blur-3xl ${t.glow}`}
      />
      {/* subtle star noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #ffffff 1px, transparent 1px), radial-gradient(circle at 70% 60%, #ffffff 1px, transparent 1px), radial-gradient(circle at 40% 80%, #ffffff 1px, transparent 1px)",
          backgroundSize: "220px 220px",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
