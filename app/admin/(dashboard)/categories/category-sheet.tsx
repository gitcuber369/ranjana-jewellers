"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { createCategory, updateCategory } from "./actions";

function CategoryForm({
  category,
  onOpenChange,
}: {
  category?: { id: string; name: string };
  onOpenChange: (open: boolean) => void;
}) {
  const [name, setName] = useState(category?.name ?? "");
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const isEdit = Boolean(category);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = isEdit ? await updateCategory(category!.id, name) : await createCategory(name);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success(isEdit ? "Category updated" : "Category created");
        onOpenChange(false);
        router.refresh();
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col">
      <SheetHeader>
        <SheetTitle>{isEdit ? "Edit Category" : "Add Category"}</SheetTitle>
        <SheetDescription>
          {isEdit ? "Update this category's name." : "Create a new category for your catalog."}
        </SheetDescription>
      </SheetHeader>
      <div className="px-4">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="category-name">Name</FieldLabel>
            <Input id="category-name" required autoFocus value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
        </FieldGroup>
      </div>
      <SheetFooter className="mt-auto flex-row justify-end">
        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save"}
        </Button>
      </SheetFooter>
    </form>
  );
}

export function CategorySheet({
  open,
  onOpenChange,
  category,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: { id: string; name: string };
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md">
        <CategoryForm key={category?.id ?? "new"} category={category} onOpenChange={onOpenChange} />
      </SheetContent>
    </Sheet>
  );
}
