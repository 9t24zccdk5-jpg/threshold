"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const sb = supabaseBrowser();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    sb.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/home");
    });
  }, [router, sb]);

  async function submit() {
    setMsg(null);
    if (!email || !password) return setMsg("Enter email + password.");

    if (mode === "signup") {
      const { error } = await sb.auth.signUp({ email, password });
      if (error) return setMsg(error.message);
      setMsg("Check your email to confirm, then log in.");
      setMode("login");
      return;
    }

    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) return setMsg(error.message);
    router.push("/home");
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl bg-smoke/40 border border-ivory/10 p-6 shadow">
        <div className="text-sm tracking-[0.25em] text-ivory/70">THRESHOLD</div>
        <h1 className="text-2xl font-semibold mt-2">
          {mode === "signup" ? "Create your doorway" : "Return to the doorway"}
        </h1>
        <p className="text-ivory/70 mt-2 text-sm">
          The app speaks to you gently. You choose what you’re ready to meet.
        </p>

        <div className="mt-5 space-y-3">
          <input
            className="w-full px-4 py-3 rounded-2xl bg-ink/70 border border-ivory/10 focus:outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full px-4 py-3 rounded-2xl bg-ink/70 border border-ivory/10 focus:outline-none"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={submit}
            className="w-full px-4 py-3 rounded-2xl bg-ivory text-ink font-semibold hover:opacity-90"
          >
            {mode === "signup" ? "Create account" : "Log in"}
          </button>

          {msg && <div className="text-sm text-ember">{msg}</div>}

          <button
            className="text-sm text-ivory/80 underline"
            onClick={() => setMode(mode === "signup" ? "login" : "signup")}
            type="button"
          >
            {mode === "signup"
              ? "Already have an account? Log in"
              : "New here? Create an account"}
          </button>
        </div>
      </div>
    </div>
  );
}
