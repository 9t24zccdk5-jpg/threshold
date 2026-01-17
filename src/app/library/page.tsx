"use client";
export const dynamic = "force-dynamic";

import Shell from "@/components/Shell";
import { LIBRARY } from "@/lib/content";
import { useEffect, useState } from "react";
import { isPro } from "@/lib/subscription";

export default function LibraryPage() {
  const [pro, setPro] = useState(false);

  useEffect(() => {
    isPro().then(setPro);
  }, []);

  return (
    <Shell>
      <div className="rounded-3xl bg-smoke/35 border border-ivory/10 p-6">
        <h1 className="text-2xl font-semibold">Library</h1>
        <p className="text-sm text-ivory/70 mt-2">
          A knowledge vault for baby witches and experienced practitioners alike.
        </p>

        <div className="mt-6 space-y-3">
          {LIBRARY.map((item) => {
            const locked = item.tier === "pro" && !pro;

            return (
              <div
                key={item.id}
                className="rounded-2xl bg-ink/55 border border-ivory/10 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold">{item.title}</div>

                  {locked && (
                    <div className="text-xs px-2 py-1 rounded-xl bg-ivory/10 border border-ivory/15">
                      Locked
                    </div>
                  )}
                </div>

                <div className="text-sm text-ivory/80 mt-2">
                  {locked ? "Upgrade to open this entry." : item.body}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}
