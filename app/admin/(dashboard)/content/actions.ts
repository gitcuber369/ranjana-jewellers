"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/supabase/require-user";

type SectionInput = {
  sectionKey: string;
  title: string | null;
  subtitle: string | null;
  imageUrl: string | null;
  linkHref: string | null;
  sortOrder: number;
};

export async function createSection(input: SectionInput): Promise<{ error?: string }> {
  const supabase = await createClient();
  const authError = await requireUser(supabase);
  if (authError) return authError;

  const { error } = await supabase.from("site_sections").insert({
    section_key: input.sectionKey,
    title: input.title,
    subtitle: input.subtitle,
    image_url: input.imageUrl,
    link_href: input.linkHref,
    sort_order: input.sortOrder,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/content");
  revalidatePath("/");
  return {};
}

export async function updateSection(id: string, input: SectionInput): Promise<{ error?: string }> {
  const supabase = await createClient();
  const authError = await requireUser(supabase);
  if (authError) return authError;

  const { error } = await supabase
    .from("site_sections")
    .update({
      section_key: input.sectionKey,
      title: input.title,
      subtitle: input.subtitle,
      image_url: input.imageUrl,
      link_href: input.linkHref,
      sort_order: input.sortOrder,
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/content");
  revalidatePath("/");
  return {};
}

export async function deleteSection(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const authError = await requireUser(supabase);
  if (authError) return authError;

  const { error } = await supabase.from("site_sections").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/content");
  revalidatePath("/");
  return {};
}
