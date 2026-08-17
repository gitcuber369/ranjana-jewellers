import type { SupabaseClient } from "@supabase/supabase-js";

// Defense-in-depth: RLS already blocks unauthenticated writes at the database
// level, but Server Actions should never rely solely on that as the only gate.
export async function requireUser(supabase: SupabaseClient): Promise<{ error: string } | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { error: "You must be signed in to do this." };
  return null;
}
