import { supabaseBrowser } from "./supabase";

export async function isPro(): Promise<boolean> {
  const sb = supabaseBrowser();
  const { data: { session } } = await sb.auth.getSession();

  if (!session?.user) return false;

  const { data } = await sb
    .from("subscriptions")
    .select("status")
    .eq("user_id", session.user.id)
    .maybeSingle();

  return data?.status === "active" || data?.status === "trialing";
}
