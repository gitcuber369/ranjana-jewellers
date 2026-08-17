"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { ImageIcon, Upload, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { sanitizeFilename } from "@/lib/sanitize-filename";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SECTION_KEYS } from "./section-keys";

type SectionInput = {
  sectionKey: string;
  title: string | null;
  subtitle: string | null;
  imageUrl: string | null;
  linkHref: string | null;
  sortOrder: number;
};

export function ContentForm({
  defaultValues,
  onSubmit,
  onSuccess,
  onCancel,
}: {
  defaultValues?: SectionInput;
  onSubmit: (input: SectionInput) => Promise<{ error?: string }>;
  onSuccess: () => void;
  onCancel: () => void;
}) {
  const [sectionKey, setSectionKey] = useState(defaultValues?.sectionKey ?? SECTION_KEYS[0].value);
  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [subtitle, setSubtitle] = useState(defaultValues?.subtitle ?? "");
  const [imageUrl, setImageUrl] = useState<string | null>(defaultValues?.imageUrl ?? null);
  const [linkHref, setLinkHref] = useState(defaultValues?.linkHref ?? "");
  const [sortOrder, setSortOrder] = useState(String(defaultValues?.sortOrder ?? 0));
  const [uploading, setUploading] = useState(false);
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
      const result = await onSubmit({
        sectionKey,
        title: title.trim() || null,
        subtitle: subtitle.trim() || null,
        imageUrl,
        linkHref: linkHref.trim() || null,
        sortOrder: Number(sortOrder) || 0,
      });
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(defaultValues ? "Block updated" : "Block created");
        onSuccess();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="section-key">Section</FieldLabel>
          <Select value={sectionKey} onValueChange={(value) => setSectionKey(value ?? SECTION_KEYS[0].value)}>
            <SelectTrigger id="section-key" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SECTION_KEYS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </Field>

        <Field>
          <FieldLabel htmlFor="subtitle">Subtitle</FieldLabel>
          <Textarea id="subtitle" rows={2} value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
        </Field>

        <Field>
          <FieldLabel htmlFor="link-href">Link (optional)</FieldLabel>
          <Input
            id="link-href"
            placeholder="/collections/rakhi"
            value={linkHref}
            onChange={(e) => setLinkHref(e.target.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="sort-order">Sort order</FieldLabel>
          <Input
            id="sort-order"
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          />
        </Field>
      </FieldGroup>

      <div className="space-y-4">
        <h3 className="text-sm font-medium">Image</h3>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleImageChange}
          disabled={uploading}
          className="sr-only"
          aria-label="Upload section image"
        />

        {imageUrl ? (
          <div className="flex items-start gap-4">
            <div className="relative size-24 shrink-0 overflow-hidden rounded-lg border bg-muted">
              <Image src={imageUrl} alt="" fill className="object-cover" />
            </div>
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
          </button>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={pending || uploading}>
          {pending ? "Saving..." : "Save Block"}
        </Button>
      </div>
    </form>
  );
}
