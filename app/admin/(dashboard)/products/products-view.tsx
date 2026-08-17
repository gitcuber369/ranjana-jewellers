"use client";

import { useState } from "react";
import Image from "next/image";
import { Package, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductFilters } from "@/components/admin/product-filters";
import { RowActions } from "@/components/admin/row-actions";
import { productShareLink } from "@/lib/whatsapp";
import { ProductSheet } from "./product-sheet";
import { deleteProduct } from "./actions";

type Category = { id: string; name: string };
type Product = {
  id: string;
  name: string;
  description: string;
  categoryId: string | null;
  categoryName: string | null;
  imageUrl: string | null;
  createdAt: string;
  isFeatured: boolean;
};

type SheetState = { mode: "create" } | { mode: "edit"; product: Product } | null;

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export function ProductsView({
  products,
  categories,
  isFiltered,
}: {
  products: Product[];
  categories: Category[];
  isFiltered: boolean;
}) {
  const [sheetState, setSheetState] = useState<SheetState>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Products</h1>
          <p className="text-sm text-muted-foreground">Manage your jewelry catalog and product information.</p>
        </div>
        <Button onClick={() => setSheetState({ mode: "create" })}>
          <Plus />
          Add Product
        </Button>
      </div>

      <ProductFilters categories={categories} />

      {products.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Package />
            </EmptyMedia>
            <EmptyTitle>{isFiltered ? "No matching products" : "No products yet"}</EmptyTitle>
            <EmptyDescription>
              {isFiltered
                ? "Try a different search term or category filter."
                : "Start building your jewelry catalog by adding your first product."}
            </EmptyDescription>
          </EmptyHeader>
          {!isFiltered && (
            <EmptyContent>
              <Button onClick={() => setSheetState({ mode: "create" })}>
                <Plus />
                Add Product
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
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative size-10 shrink-0 overflow-hidden rounded-md bg-muted">
                          {product.imageUrl && <Image src={product.imageUrl} alt="" fill className="object-cover" />}
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {product.categoryName ? (
                        <Badge variant="secondary">{product.categoryName}</Badge>
                      ) : (
                        <span className="text-sm text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{formatDate(product.createdAt)}</TableCell>
                    <TableCell>
                      <RowActions
                        id={product.id}
                        itemLabel={product.name}
                        deleteAction={deleteProduct}
                        onEdit={() => setSheetState({ mode: "edit", product })}
                        shareHref={productShareLink({
                          name: product.name,
                          description: product.description,
                          image: product.imageUrl,
                        })}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <ProductSheet
        open={sheetState !== null}
        onOpenChange={(open) => !open && setSheetState(null)}
        categories={categories}
        product={sheetState?.mode === "edit" ? sheetState.product : undefined}
      />
    </div>
  );
}
