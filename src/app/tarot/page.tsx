"use client";

import Shell from "@/components/Shell";
import { supabaseBrowser } from "@/lib/supabase";
import { draw, Spread } from "@/lib/tarot";
import { useEffect, useState } from "react";
import { isPro } from "@/lib/subscription";

export default function TarotPage() {
  const sb = supabaseBrowser();

  const [pro, setPro] = useState(false);
  const [spread, setSpread] = useState<Spread>("daily");
  const [cards, setCards] = useState<any[] | null>(null);
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const {
        data: { session },
      } = await sb.auth.getSession();

      if (!session?.user) {
        window.location.href = "/auth";
        return;
      }

      const proNow = await isPro();
      setPro(proNow);

      const { data } = await sb
        .from("tarot_pulls")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(proNow ? 30 : 3);

      setHistory(data ?? []);
    })();
  }, [sb]);

  async function pull() {
    const {
      data: { session },
    } = await sb.auth.getSession();
    const user = session?.user;
    if (!user) return;

    if (!pro && spread !== "daily") {
      alert("Free tier includes the daily pull. Upgrade for more spreads.");
      return;
    }

    const today = new Date().toISOString().slice(0, 10);
    const seed = `${user.id}:${spread}:${today}:${Date.now()}`;
    const result = draw(seed, spread);

    setCards(result);

    await sb.from("tarot_pulls").insert({
      user_id: user.id,
      pull_date: today,
      spread,
      cards: result,
    });

    const { data } = await sb
      .from("tarot_pulls")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(pro ? 30 : 3);

    setHistory(data ?? []);
  }

  return (
    <Shell>
      <div className="rounded-3xl bg-smoke/35 border border-ivory/10 p-6">
        <h1 className="text-2xl font-semibold">Tarot</h1>
        <p className="text-sm text-ivory/70 mt-2">
          You don’t need certainty. You need a mirror that tells the truth kindly.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <select
            className="px-4 py-2 rounded-2xl bg-ink/70 border border-ivory/10"
            value={spread}
            onChange={(e) => setSpread(e.target.value as Spread)}
          >
            <option value="daily">Daily (1 card)</option>
            <option value="one_card">One Card (Pro)</option>
            <option value="three_card">Mind / Body / Spirit (Pro)</option>
            <option value="three_card_classic">Past / Present / Outcome (Pro)</option>
          </select>

          <button
            onClick={pull}
            className="px-4 py-2 rounded-2xl bg-ivory text-ink font-semibold"
          >
            Pull
          </button>
        </div>

        {cards && (
          <div className="mt-6 grid md:grid-cols-3 gap-3">
            {cards.map((c, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-ink/55 border border-ivory/10 p-4"
              >
                <div className="text-xs tracking-[0.2em] text-ivory/70">
                  {c.label}
                </div>
                <div className="text-sm font-semibold mt-1">{c.name}</div>
                <div className="mt-2 text-xs text-ivory/60">Meaning Labels</div>

<div className="mt-1 text-xs text-ivory/80">
  <span className="text-ivory/60">Light:</span>{" "}
  {(c.meaningLabels?.light ?? []).join(", ") || "—"}
</div>

<div className="mt-1 text-xs text-ivory/80">
  <span className="text-ivory/60">Shadow:</span>{" "}
  {(c.meaningLabels?.shadow ?? []).join(", ") || "—"}
</div>

<div className="text-xs text-ivory/70 mt-3">Guidance</div>
<div className="text-sm text-ivory/85 mt-1">{c.guidance}</div>

              </div>
            ))}
          </div>
        )}

        <div className="mt-10">
          <div className="text-lg font-semibold">Recent pulls</div>
          <div className="text-sm text-ivory/60">
            {pro ? "Full recent history (30 shown)." : "Free tier shows last 3 pulls."}
          </div>

          <div className="mt-4 space-y-3">
            {history.map((h) => (
              <div
                key={h.id}
                className="rounded-2xl bg-ink/55 border border-ivory/10 p-4"
              >
                <div className="text-xs text-ivory/60">
                  {new Date(h.created_at).toLocaleString()}
                </div>
                <div className="text-sm text-ivory/80 mt-2">
                  {(h.cards ?? []).map((c: any) => c.name).join(" • ")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}
