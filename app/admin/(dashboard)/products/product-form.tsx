"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { ImageIcon, Upload, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { sanitizeFilename } from "@/lib/sanitize-filename";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

type Category = { id: string; name: string };

type ProductInput = {
  name: string;
  description: string;
  categoryId: string | null;
  imageUrl: string | null;
  isFeatured: boolean;
};

export function ProductForm({
  categories,
  defaultValues,
  onSubmit,
  onSuccess,
  onCancel,
}: {
  categories: Category[];
  defaultValues?: {
    name: string;
    description: string;
    categoryId: string | null;
    imageUrl: string | null;
    isFeatured: boolean;
  };
  onSubmit: (input: ProductInput) => Promise<{ error?: string }>;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [description, setDescription] = useState(defaultValues?.description ?? "");
  const [categoryId, setCategoryId] = useState<string | null>(defaultValues?.categoryId ?? null);
  const [imageUrl, setImageUrl] = useState<string | null>(defaultValues?.imageUrl ?? null);
  const [isFeatured, setIsFeatured] = useState(defaultValues?.isFeatured ?? false);
  const [uploading, setUploading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const supabase = createClient();
    const path = `${Date.now()}-${sanitizeFilename(file.name)}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file);

    if (error) {
      toast.error(error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    setImageUrl(data.publicUrl);
    setUploading(false);
    toast.success("Image uploaded");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = await onSubmit({ name, description, categoryId, imageUrl, isFeatured });
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(defaultValues ? "Product updated" : "Product created");
        onSuccess();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Product Information</h3>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="category">Category</FieldLabel>
            <Select value={categoryId ?? undefined} onValueChange={(value) => setCategoryId(value)}>
              <SelectTrigger id="category" className="w-full">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field orientation="horizontal">
            <FieldLabel htmlFor="is-featured">Featured on homepage</FieldLabel>
            <Switch id="is-featured" checked={isFeatured} onCheckedChange={setIsFeatured} />
          </Field>
        </FieldGroup>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Product Image</h3>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleImageChange}
          disabled={uploading}
          className="sr-only"
          aria-label="Upload product image"
        />

        {imageUrl ? (
          <div className="flex items-start gap-4">
            <button
              type="button"
              onClick={() => setPreviewOpen(true)}
              className="relative size-24 shrink-0 overflow-hidden rounded-lg border bg-muted"
              aria-label="View full-size image"
            >
              <Image src={imageUrl} alt="" fill className="object-cover" />
            </button>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  disabled={uploading}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload />
                  Replace
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => setImageUrl(null)}>
                  <X />
                  Remove
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP, up to 50MB.</p>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex w-full flex-col items-center gap-2 rounded-lg border border-dashed p-8 text-center transition-colors hover:bg-muted/50 disabled:opacity-50"
          >
            <ImageIcon className="size-6 text-muted-foreground" />
            <span className="text-sm font-medium">{uploading ? "Uploading..." : "Click to upload an image"}</span>
            <span className="text-xs text-muted-foreground">PNG, JPG, or WEBP, up to 50MB</span>
          </button>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={pending || uploading}>
          {pending ? "Saving..." : "Save Product"}
        </Button>
      </div>

      {imageUrl && (
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogTitle className="sr-only">{name || "Product image"} preview</DialogTitle>
            <div className="relative aspect-square w-full overflow-hidden rounded-lg">
              <Image src={imageUrl} alt="" fill className="object-contain" />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </form>
  );
}
