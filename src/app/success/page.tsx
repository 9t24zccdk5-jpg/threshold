import Shell from "@/components/Shell";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <Shell>
      <div className="rounded-3xl bg-smoke/35 border border-ivory/10 p-6">
        <h1 className="text-2xl font-semibold">You’re in.</h1>
        <p className="text-sm text-ivory/70 mt-2">
          Your Pro access will unlock as soon as the subscription sync completes.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/home"
            className="px-4 py-2 rounded-2xl bg-ivory text-ink font-semibold"
          >
            Go home
          </Link>

          <Link
            href="/tarot"
            className="px-4 py-2 rounded-2xl bg-ink/60 border border-ivory/10 hover:border-ivory/25"
          >
            Pull tarot
          </Link>
        </div>
      </div>
    </Shell>
  );
}
