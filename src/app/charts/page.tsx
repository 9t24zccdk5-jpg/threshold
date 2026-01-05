"use client";

import Shell from "@/components/Shell";
import { useState } from "react";

export default function ChartsPage() {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [sun, setSun] = useState("");
  const [moon, setMoon] = useState("");
  const [rising, setRising] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function calculate() {
    setLoading(true);
    setResult(null);

    const res = await fetch("/api/charts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        birthDate,
        birthTime,
        birthPlace,
        sun,
        moon,
        rising,
      }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <Shell>
      <div className="rounded-3xl bg-smoke/35 border border-ivory/10 p-6">
        <h1 className="text-2xl font-semibold">Charts</h1>
        <p className="text-sm text-ivory/70 mt-2">
          You are not one sign. You are a sky-map.
        </p>

        <div className="mt-6 grid md:grid-cols-3 gap-2">
          <input
            className="px-4 py-3 rounded-2xl bg-ink/70 border border-ivory/10"
            placeholder="Birth date (YYYY-MM-DD)"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
          <input
            className="px-4 py-3 rounded-2xl bg-ink/70 border border-ivory/10"
            placeholder="Birth time (HH:MM)"
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
          />
          <input
            className="px-4 py-3 rounded-2xl bg-ink/70 border border-ivory/10"
            placeholder="Birth place (City, State)"
            value={birthPlace}
            onChange={(e) => setBirthPlace(e.target.value)}
          />
        </div>

        <div className="mt-3 grid md:grid-cols-3 gap-2">
          <input
            className="px-4 py-3 rounded-2xl bg-ink/70 border border-ivory/10"
            placeholder="Sun (optional)"
            value={sun}
            onChange={(e) => setSun(e.target.value)}
          />
          <input
            className="px-4 py-3 rounded-2xl bg-ink/70 border border-ivory/10"
            placeholder="Moon (optional)"
            value={moon}
            onChange={(e) => setMoon(e.target.value)}
          />
          <input
            className="px-4 py-3 rounded-2xl bg-ink/70 border border-ivory/10"
            placeholder="Rising (optional)"
            value={rising}
            onChange={(e) => setRising(e.target.value)}
          />
        </div>

        <button
          onClick={calculate}
          className="mt-4 px-4 py-3 rounded-2xl bg-ivory text-ink font-semibold"
          disabled={loading}
        >
          {loading ? "Calculating…" : "Calculate"}
        </button>

        {result && (
          <div className="mt-6 grid md:grid-cols-2 gap-3">
            <div className="rounded-2xl bg-ink/55 border border-ivory/10 p-4">
              <div className="text-sm font-semibold">Astrology</div>
              <div className="text-sm text-ivory/80 mt-2">
                Sun: {result.astrology?.sun}
                <br />
                Moon: {result.astrology?.moon}
                <br />
                Rising: {result.astrology?.rising}
              </div>
              <div className="text-xs text-ivory/60 mt-2">
                {result.astrology?.note}
              </div>
            </div>

            <div className="rounded-2xl bg-ink/55 border border-ivory/10 p-4">
              <div className="text-sm font-semibold">Human Design</div>
              <div className="text-sm text-ivory/80 mt-2">
                Type: {result.humanDesign?.type}
                <br />
                Authority: {result.humanDesign?.authority}
                <br />
                Profile: {result.humanDesign?.profile}
              </div>
              <div className="text-xs text-ivory/60 mt-2">
                {result.humanDesign?.note}
              </div>
            </div>
          </div>
        )}

        <div className="text-xs text-ivory/60 mt-6">
          Mode A launch: demo output until calculation APIs are connected.
        </div>
      </div>
    </Shell>
  );
}
