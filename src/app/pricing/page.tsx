"use client";

import Shell from "@/components/Shell";
import { supabaseBrowser } from "@/lib/supabase";

export default function PricingPage() {
  const sb = supabaseBrowser();

  async function subscribe() {
    const {
      data: { session },
    } = await sb.auth.getSession();

    const user = session?.user;
    if (!user) {
      window.location.href = "/auth";
      return;
    }

    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userId: user.id,
        email: user.email,
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  }

  return (
    <Shell>
      <div className="rounded-3xl bg-smoke/35 border border-ivory/10 p-6">
        <h1 className="text-2xl font-semibold">Upgrade</h1>
        <p className="text-sm text-ivory/70 mt-2">
          Free lets you explore. Pro opens the full temple.
        </p>

        <div className="mt-6 grid md:grid-cols-2 gap-3">
          <div className="rounded-2xl bg-ink/55 border border-ivory/10 p-4">
            <div className="text-lg font-semibold">Free</div>
            <ul className="mt-3 text-sm text-ivory/80 space-y-2 list-disc pl-5">
              <li>Daily shadow prompt + saved entry</li>
              <li>Daily tarot pull</li>
              <li>Limited rituals + library</li>
              <li>Charts + horoscope (demo mode)</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-ink/55 border border-ivory/20 p-4">
            <div className="text-lg font-semibold">Pro — $11 / month</div>
            <ul className="mt-3 text-sm text-ivory/80 space-y-2 list-disc pl-5">
              <li>Full journal archive</li>
              <li>All tarot spreads + history</li>
              <li>Full ritual + knowledge vault</li>
              <li>Personalized guidance layers</li>
            </ul>

            <button
              onClick={subscribe}
              className="mt-5 w-full px-4 py-3 rounded-2xl bg-ivory text-ink font-semibold"
            >
              Subscribe
            </button>

            <div className="mt-2 text-xs text-ivory/60">Cancel anytime.</div>
          </div>
        </div>
      </div>
    </Shell>
  );
}
