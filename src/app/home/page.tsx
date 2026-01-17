"use client";
export const dynamic = "force-dynamic";

import Shell from "@/components/Shell";
import { supabaseBrowser } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { promptForDate } from "@/lib/prompts";
import Link from "next/link";

export default function HomePage() {
  const sb = supabaseBrowser();
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [interests, setInterests] = useState<any[]>(["shadow"]);

  useEffect(() => {
    (async () => {
      // ...auth checks...
      // after profile load:
      setLevel(profile.display_level ?? "beginner");
      setInterests(profile.interests ?? ["shadow"]);
    })();
  }, [sb]);

  const today = new Date().toISOString().slice(0, 10);
  const prompt = promptForDate(today, level, interests);

  // ...
}



  return (
    <Shell>
      <div className="rounded-3xl bg-smoke/35 border border-ivory/10 p-6">
        <div className="text-ivory/70 text-sm">Today’s threshold</div>

        <div className="text-xl font-semibold mt-2">{prompt.text}</div>

        <p className="mt-3 text-ivory/75 text-sm">
          You don’t have to solve yourself. You only have to meet what’s true.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            className="px-4 py-2 rounded-2xl bg-ivory text-ink font-semibold"
            href="/journal"
          >
            Write today’s entry
          </Link>

          <Link
            className="px-4 py-2 rounded-2xl bg-ink/60 border border-ivory/10 hover:border-ivory/25"
            href="/tarot"
          >
            Pull tarot
          </Link>

          <Link
            className="px-4 py-2 rounded-2xl bg-ink/60 border border-ivory/10 hover:border-ivory/25"
            href="/rituals"
          >
            Find a ritual
          </Link>
        </div>
      </div>
    </Shell>
  );
}
