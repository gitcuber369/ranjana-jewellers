"use client";

import { useState } from "react";
import Image from "next/image";
import { LayoutGrid, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ContentFilters } from "@/components/admin/content-filters";
import { RowActions } from "@/components/admin/row-actions";
import { ContentSheet } from "./content-sheet";
import { deleteSection } from "./actions";
import { sectionLabel } from "./section-keys";

type Section = {
  id: string;
  sectionKey: string;
  title: string | null;
  subtitle: string | null;
  imageUrl: string | null;
  linkHref: string | null;
  sortOrder: number;
};

type SheetState = { mode: "create" } | { mode: "edit"; section: Section } | null;

export function ContentView({ sections, isFiltered }: { sections: Section[]; isFiltered: boolean }) {
  const [sheetState, setSheetState] = useState<SheetState>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Content</h1>
          <p className="text-sm text-muted-foreground">Manage editorial blocks shown on the landing page.</p>
        </div>
        <Button onClick={() => setSheetState({ mode: "create" })}>
          <Plus />
          Add Block
        </Button>
      </div>

      <ContentFilters />

      {sections.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <LayoutGrid />
            </EmptyMedia>
            <EmptyTitle>{isFiltered ? "No matching blocks" : "No content blocks yet"}</EmptyTitle>
            <EmptyDescription>
              {isFiltered
                ? "Try a different section filter."
                : "Add blocks to populate the landing page's editorial sections."}
            </EmptyDescription>
          </EmptyHeader>
          {!isFiltered && (
            <EmptyContent>
              <Button onClick={() => setSheetState({ mode: "create" })}>
                <Plus />
                Add Block
              </Button>
            </EmptyContent>
          )}
        </Empty>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Block</TableHead>
                  <TableHead>Section</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {sections.map((section) => (
                  <TableRow key={section.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative size-10 shrink-0 overflow-hidden rounded-md bg-muted">
                          {section.imageUrl && (
                            <Image src={section.imageUrl} alt="" fill className="object-cover" />
                          )}
                        </div>
                        <span className="font-medium">{section.title || "Untitled"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{sectionLabel(section.sectionKey)}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{section.sortOrder}</TableCell>
                    <TableCell>
                      <RowActions
                        id={section.id}
                        itemLabel={section.title || "This block"}
                        deleteAction={deleteSection}
                        onEdit={() => setSheetState({ mode: "edit", section })}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <ContentSheet
        open={sheetState !== null}
        onOpenChange={(open) => !open && setSheetState(null)}
        section={sheetState?.mode === "edit" ? sheetState.section : undefined}
      />
    </div>
  );
}
