"use client";

import Shell from "@/components/Shell";
import { supabaseBrowser } from "@/lib/supabase";
import { promptForDate } from "@/lib/prompts";
import { useEffect, useMemo, useState } from "react";
import { isPro } from "@/lib/subscription";

export default function JournalPage() {
  const sb = supabaseBrowser();

  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">(
    "beginner"
  );
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState<string | null>(null);
  const [entries, setEntries] = useState<any[]>([]);
  const [pro, setPro] = useState(false);

  const today = new Date().toISOString().slice(0, 10);

  const prompt = useMemo(() => {
    return promptForDate(today, level);
  }, [today, level]);

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

      const { data: profile } = await sb
        .from("profiles")
        .select("display_level")
        .eq("id", session.user.id)
        .maybeSingle();

      setLevel(profile?.display_level ?? "beginner");

      const { data } = await sb
        .from("journal_entries")
        .select("*")
        .order("entry_date", { ascending: false })
        .limit(proNow ? 90 : 7);

      setEntries(data ?? []);
    })();
  }, [sb]);

  async function saveEntry() {
    setSaved(null);

    const {
      data: { session },
    } = await sb.auth.getSession();
    const user = session?.user;
    if (!user) return;

    const { error } = await sb.from("journal_entries").upsert(
      {
        user_id: user.id,
        entry_date: today,
        prompt_id: prompt.id,
        prompt_text: prompt.text,
        content,
      },
      { onConflict: "user_id,entry_date" }
    );

    if (error) {
      setSaved(error.message);
      return;
    }

    setSaved("Saved.");

    const { data } = await sb
      .from("journal_entries")
      .select("*")
      .order("entry_date", { ascending: false })
      .limit(pro ? 90 : 7);

    setEntries(data ?? []);
  }

  return (
    <Shell>
      <div className="rounded-3xl bg-smoke/35 border border-ivory/10 p-6">
        <div className="text-sm text-ivory/70">Today’s prompt</div>
        <div className="text-xl font-semibold mt-2">{prompt.text}</div>

        <textarea
          className="mt-4 w-full min-h-[180px] px-4 py-3 rounded-2xl bg-ink/70 border border-ivory/10 focus:outline-none"
          placeholder="Speak to yourself like you matter. Write what’s real."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={saveEntry}
            className="px-4 py-2 rounded-2xl bg-ivory text-ink font-semibold"
          >
            Save entry
          </button>

          {saved && <span className="text-sm text-ember">{saved}</span>}
        </div>

        <div className="mt-8">
          <div className="text-lg font-semibold">Your diary</div>
          <div className="text-sm text-ivory/60">
            {pro
              ? "Full archive (last 90 shown)."
              : "Free tier shows last 7 entries. Upgrade for full archive."}
          </div>

          <div className="mt-4 space-y-3">
            {entries.map((e) => (
              <div
                key={e.id}
                className="rounded-2xl bg-ink/55 border border-ivory/10 p-4"
              >
                <div className="text-xs text-ivory/60">{e.entry_date}</div>
                <div className="text-sm font-semibold mt-1">
                  {e.prompt_text}
                </div>
                <div className="text-sm text-ivory/80 mt-2 whitespace-pre-wrap">
                  {e.content}
                </div>
              </div>
            ))}

            {entries.length === 0 && (
              <div className="text-sm text-ivory/70">Your pages are waiting.</div>
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
}
