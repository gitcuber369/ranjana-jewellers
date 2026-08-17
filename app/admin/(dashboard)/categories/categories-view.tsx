"use client";

import { useState } from "react";
import { Plus, Tags } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RowActions } from "@/components/admin/row-actions";
import { CategorySheet } from "./category-sheet";
import { deleteCategory } from "./actions";

type Category = { id: string; name: string; productCount: number };

type DialogState = { mode: "create" } | { mode: "edit"; category: { id: string; name: string } } | null;

export function CategoriesView({ categories }: { categories: Category[] }) {
  const [dialogState, setDialogState] = useState<DialogState>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Categories</h1>
          <p className="text-sm text-muted-foreground">Organize your jewelry catalog.</p>
        </div>
        <Button onClick={() => setDialogState({ mode: "create" })}>
          <Plus />
          Add Category
        </Button>
      </div>

      {categories.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Tags />
            </EmptyMedia>
            <EmptyTitle>No categories yet</EmptyTitle>
            <EmptyDescription>Create your first category to start organizing your catalog.</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button onClick={() => setDialogState({ mode: "create" })}>
              <Plus />
              Add Category
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{category.productCount}</Badge>
                    </TableCell>
                    <TableCell>
                      <RowActions
                        id={category.id}
                        itemLabel={category.name}
                        deleteAction={deleteCategory}
                        onEdit={() => setDialogState({ mode: "edit", category })}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <CategorySheet
        open={dialogState !== null}
        onOpenChange={(open) => !open && setDialogState(null)}
        category={dialogState?.mode === "edit" ? dialogState.category : undefined}
      />
    </div>
  );
}
