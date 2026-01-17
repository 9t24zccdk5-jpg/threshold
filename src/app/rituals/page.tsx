"use client";
export const dynamic = "force-dynamic";

import Shell from "@/components/Shell";
import { RITUALS } from "@/lib/content";
import { useEffect, useState } from "react";
import { isPro } from "@/lib/subscription";

export default function RitualsPage() {
  const [pro, setPro] = useState(false);

  useEffect(() => {
    isPro().then(setPro);
  }, []);

  return (
    <Shell>
      <div className="rounded-3xl bg-smoke/35 border border-ivory/10 p-6">
        <h1 className="text-2xl font-semibold">Rituals</h1>
        <p className="text-sm text-ivory/70 mt-2">
          Warm, clean, practical magic—without the noise.
        </p>

        <div className="mt-6 space-y-3">
          {RITUALS.map((r) => {
            const locked = r.tier === "pro" && !pro;

            return (
              <div
                key={r.id}
                className="rounded-2xl bg-ink/55 border border-ivory/10 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold">{r.title}</div>
                    <div className="text-xs text-ivory/60">
                      {r.level} • {r.tier.toUpperCase()}
                    </div>
                  </div>

                  {locked && (
                    <div className="text-xs px-2 py-1 rounded-xl bg-ivory/10 border border-ivory/15">
                      Locked
                    </div>
                  )}
                </div>

                <div className="mt-3 text-sm text-ivory/85">
                  {locked ? (
                    "Upgrade to open this ritual."
                  ) : (
                    <ol className="list-decimal pl-5 space-y-1">
                      {r.body.map((step, i) => (
                        <li key={i}>{step}</li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}
