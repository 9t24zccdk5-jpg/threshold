"use client";
export const dynamic = "force-dynamic";

import Shell from "@/components/Shell";
import { supabaseBrowser } from "@/lib/supabase";

export default function AccountPage() {
  const sb = supabaseBrowser();

  async function logout() {
    await sb.auth.signOut();
    window.location.href = "/auth";
  }

  return (
    <Shell>
      <div className="rounded-3xl bg-smoke/35 border border-ivory/10 p-6">
        <h1 className="text-2xl font-semibold">Account</h1>
        <p className="text-sm text-ivory/70 mt-2">
          You remain anonymous. Your work stays yours.
        </p>

        <div className="mt-6">
          <button
            onClick={logout}
            className="px-4 py-3 rounded-2xl bg-ink/60 border border-ivory/10 hover:border-ivory/25"
            type="button"
          >
            Log out
          </button>
        </div>
      </div>
    </Shell>
  );
}
