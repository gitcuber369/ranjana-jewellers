"use client";

import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ProductForm } from "./product-form";
import { createProduct, updateProduct } from "./actions";

type Category = { id: string; name: string };
type Product = {
  id: string;
  name: string;
  description: string;
  categoryId: string | null;
  imageUrl: string | null;
  isFeatured: boolean;
};

export function ProductSheet({
  open,
  onOpenChange,
  categories,
  product,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: Category[];
  product?: Product;
}) {
  const router = useRouter();
  const isEdit = Boolean(product);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>{isEdit ? "Edit Product" : "Add Product"}</SheetTitle>
          <SheetDescription>
            {isEdit ? "Update this product's details." : "Add a new item to your jewelry catalog."}
          </SheetDescription>
        </SheetHeader>
        <div className="px-4 pb-4">
          <ProductForm
            key={product?.id ?? "new"}
            categories={categories}
            defaultValues={
              product
                ? {
                    name: product.name,
                    description: product.description,
                    categoryId: product.categoryId,
                    imageUrl: product.imageUrl,
                    isFeatured: product.isFeatured,
                  }
                : undefined
            }
            onSubmit={isEdit ? updateProduct.bind(null, product!.id) : createProduct}
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
