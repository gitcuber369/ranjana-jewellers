"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/supabase/require-user";

export async function createCategory(name: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const authError = await requireUser(supabase);
  if (authError) return authError;

  const { error } = await supabase.from("categories").insert({ name: name.trim() });

  if (error) return { error: error.message };

  revalidatePath("/admin/categories");
  revalidatePath("/");
  return {};
}

export async function updateCategory(id: string, name: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const authError = await requireUser(supabase);
  if (authError) return authError;

  const { error } = await supabase.from("categories").update({ name: name.trim() }).eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/categories");
  revalidatePath("/");
  return {};
}

export async function deleteCategory(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const authError = await requireUser(supabase);
  if (authError) return authError;

  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/categories");
  revalidatePath("/");
  return {};
}
