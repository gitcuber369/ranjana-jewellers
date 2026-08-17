"use client";

import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ContentForm } from "./content-form";
import { createSection, updateSection } from "./actions";

type Section = {
  id: string;
  sectionKey: string;
  title: string | null;
  subtitle: string | null;
  imageUrl: string | null;
  linkHref: string | null;
  sortOrder: number;
};

export function ContentSheet({
  open,
  onOpenChange,
  section,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  section?: Section;
}) {
  const router = useRouter();
  const isEdit = Boolean(section);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{isEdit ? "Edit Content Block" : "Add Content Block"}</SheetTitle>
          <SheetDescription>
            {isEdit ? "Update this content block." : "Add a new editorial block to a landing page section."}
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-4">
          <ContentForm
            key={section?.id ?? "new"}
            defaultValues={
              section
                ? {
                    sectionKey: section.sectionKey,
                    title: section.title,
                    subtitle: section.subtitle,
                    imageUrl: section.imageUrl,
                    linkHref: section.linkHref,
                    sortOrder: section.sortOrder,
                  }
                : undefined
            }
            onSubmit={isEdit ? updateSection.bind(null, section!.id) : createSection}
            onSuccess={() => {
              onOpenChange(false);
              router.refresh();
            }}
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
