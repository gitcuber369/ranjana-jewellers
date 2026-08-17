"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireUser } from "@/lib/supabase/require-user";

export async function createProduct(input: {
  name: string;
  description: string;
  categoryId: string | null;
  imageUrl: string | null;
  isFeatured: boolean;
}): Promise<{ error?: string }> {
  const supabase = await createClient();
  const authError = await requireUser(supabase);
  if (authError) return authError;

  const { error } = await supabase.from("products").insert({
    name: input.name,
    description: input.description,
    category_id: input.categoryId,
    image_url: input.imageUrl,
    is_featured: input.isFeatured,
  });

  if (error) return { error: error.message };

  revalidatePath("/admin/products");
  revalidatePath("/");
  return {};
}

export async function updateProduct(
  id: string,
  input: {
    name: string;
    description: string;
    categoryId: string | null;
    imageUrl: string | null;
    isFeatured: boolean;
  }
): Promise<{ error?: string }> {
  const supabase = await createClient();
  const authError = await requireUser(supabase);
  if (authError) return authError;

  const { error } = await supabase
    .from("products")
    .update({
      name: input.name,
      description: input.description,
      category_id: input.categoryId,
      image_url: input.imageUrl,
      is_featured: input.isFeatured,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/products");
  revalidatePath("/");
  return {};
}

export async function deleteProduct(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const authError = await requireUser(supabase);
  if (authError) return authError;

  const { error } = await supabase.from("products").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/products");
  revalidatePath("/");
  return {};
}
