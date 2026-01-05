"use client";

import Shell from "@/components/Shell";
import { supabaseBrowser } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Onboarding() {
  const sb = supabaseBrowser();

  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">(
    "beginner"
  );
  const [interests, setInterests] = useState<string[]>(["shadow"]);
  const [sun, setSun] = useState("");
  const [moon, setMoon] = useState("");
  const [rising, setRising] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    sb.auth.getSession().then(({ data }) => {
      if (!data.session?.user) window.location.href = "/auth";
    });
  }, [sb]);

  function toggle(i: string) {
    setInterests((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  }

  async function save() {
    setMsg(null);
    const {
      data: { session },
    } = await sb.auth.getSession();

    const user = session?.user;
    if (!user) return;

    const { error } = await sb.from("profiles").upsert({
      id: user.id,
      display_level: level,
      interests,
      sun_sign: sun || null,
      moon_sign: moon || null,
      rising_sign: rising || null,
    });

    if (error) return setMsg(error.message);
    window.location.href = "/home";
  }

  return (
    <Shell>
      <div className="rounded-3xl bg-smoke/35 border border-ivory/10 p-6">
        <h1 className="text-2xl font-semibold">Set your threshold</h1>
        <p className="text-sm text-ivory/70 mt-2">
          This adjusts your prompts, your language, and what we place in your
          path.
        </p>

        <div className="mt-6 grid gap-5">
          <div>
            <div className="text-sm text-ivory/80 mb-2">Your practice level</div>
            <select
              className="w-full px-4 py-3 rounded-2xl bg-ink/70 border border-ivory/10"
              value={level}
              onChange={(e) =>
                setLevel(
                  e.target.value as "beginner" | "intermediate" | "advanced"
                )
              }
            >
              <option value="beginner">Baby witch (beginner)</option>
              <option value="intermediate">Practicing (intermediate)</option>
              <option value="advanced">Experienced (advanced)</option>
            </select>
          </div>

          <div>
            <div className="text-sm text-ivory/80 mb-2">What you want most</div>
            <div className="flex flex-wrap gap-2">
              {[
                "shadow",
                "tarot",
                "rituals",
                "astrology",
                "human_design",
                "protection",
              ].map((x) => (
                <button
                  key={x}
                  onClick={() => toggle(x)}
                  className={[
                    "px-3 py-2 rounded-2xl border text-sm",
                    interests.includes(x)
                      ? "bg-ivory/10 border-ivory/25"
                      : "bg-ink/50 border-ivory/10 hover:border-ivory/25",
                  ].join(" ")}
                  type="button"
                >
                  {x.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-ink/45 border border-ivory/10 p-4">
            <div className="text-sm text-ivory/80 mb-2">
              Optional: Sun / Moon / Rising
            </div>
            <div className="grid md:grid-cols-3 gap-2">
              <input
                className="px-4 py-3 rounded-2xl bg-ink/70 border border-ivory/10"
                placeholder="Sun (e.g., Scorpio)"
                value={sun}
                onChange={(e) => setSun(e.target.value)}
              />
              <input
                className="px-4 py-3 rounded-2xl bg-ink/70 border border-ivory/10"
                placeholder="Moon"
                value={moon}
                onChange={(e) => setMoon(e.target.value)}
              />
              <input
                className="px-4 py-3 rounded-2xl bg-ink/70 border border-ivory/10"
                placeholder="Rising"
                value={rising}
                onChange={(e) => setRising(e.target.value)}
              />
            </div>
            <div className="text-xs text-ivory/60 mt-2">
              If you don’t know these yet, it’s okay. Charts can calculate them
              when you connect providers.
            </div>
          </div>

          <button
            onClick={save}
            className="px-4 py-3 rounded-2xl bg-ivory text-ink font-semibold"
            type="button"
          >
            Step through
          </button>

          {msg && <div className="text-sm text-ember">{msg}</div>}
        </div>
      </div>
    </Shell>
  );
}
