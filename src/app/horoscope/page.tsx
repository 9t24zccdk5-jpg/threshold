"use client";
export const dynamic = "force-dynamic";

import Shell from "@/components/Shell";
import { supabaseBrowser } from "@/lib/supabase";
import { useEffect, useState } from "react";

function buildHoroscope(sun?: string, moon?: string, rising?: string) {
  const S = sun || "your Sun";
  const M = moon || "your Moon";
  const R = rising || "your Rising";

  return `With ${S} guiding your will, ${M} holding your emotional truth, and ${R} shaping how you meet the world,
today is about honest pacing.

Move at the speed of integrity.
Name one boundary.
Choose one devotion.
Let that be enough.`;
}

export default function HoroscopePage() {
  const sb = supabaseBrowser();
  const [sun, setSun] = useState<string | undefined>();
  const [moon, setMoon] = useState<string | undefined>();
  const [rising, setRising] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await sb.auth.getSession();

      if (!session?.user) {
        window.location.href = "/auth";
        return;
      }

      const { data: profile } = await sb
        .from("profiles")
        .select("sun_sign, moon_sign, rising_sign")
        .eq("id", session.user.id)
        .maybeSingle();

      setSun(profile?.sun_sign ?? undefined);
      setMoon(profile?.moon_sign ?? undefined);
      setRising(profile?.rising_sign ?? undefined);
    })();
  }, [sb]);

  return (
    <Shell>
      <div className="rounded-3xl bg-smoke/35 border border-ivory/10 p-6">
        <h1 className="text-2xl font-semibold">Horoscope</h1>
        <p className="text-sm text-ivory/70 mt-2">
          Not one-sign noise. Your full triad, read together.
        </p>

        <div className="mt-5 rounded-2xl bg-ink/55 border border-ivory/10 p-4">
          <div className="text-sm text-ivory/80">
            <div>Sun: {sun ?? "—"}</div>
            <div>Moon: {moon ?? "—"}</div>
            <div>Rising: {rising ?? "—"}</div>
          </div>

          <div className="mt-4 text-sm text-ivory/85 whitespace-pre-wrap">
            {buildHoroscope(sun, moon, rising)}
          </div>

          <div className="mt-3 text-xs text-ivory/60">
            When chart calculations are connected, this updates automatically.
          </div>
        </div>
      </div>
    </Shell>
  );
}
