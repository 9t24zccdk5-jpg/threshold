"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/home", label: "Home" },
  { href: "/journal", label: "Journal" },
  { href: "/tarot", label: "Tarot" },
  { href: "/rituals", label: "Rituals" },
  { href: "/library", label: "Library" },
  { href: "/charts", label: "Charts" },
  { href: "/horoscope", label: "Horoscope" },
  { href: "/account", label: "Account" }
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-6 pt-8 pb-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-sm tracking-[0.3em] text-ivory/70">THRESHOLD</div>
              <div className="text-2xl font-semibold">Where Shadow Becomes Wisdom</div>
            </div>
            <Link
              className="text-sm px-3 py-2 rounded-xl bg-smoke/60 border border-ivory/10 hover:border-ivory/25"
              href="/pricing"
            >
              Upgrade
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 pb-24">
        <div className="max-w-4xl mx-auto">{children}</div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-ink/90 backdrop-blur border-t border-ivory/10">
        <div className="max-w-4xl mx-auto px-3 py-3 flex gap-2 overflow-x-auto">
          {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={[
                "text-sm px-3 py-2 rounded-xl border whitespace-nowrap",
                path === t.href
                  ? "bg-ivory/10 border-ivory/25"
                  : "bg-smoke/40 border-ivory/10 hover:border-ivory/25"
              ].join(" ")}
            >
              {t.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
