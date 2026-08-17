"use client";

import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb";

const SECTION_LABELS: Record<string, string> = {
  products: "Products",
  categories: "Categories",
  content: "Content",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const section = pathname.split("/").filter(Boolean)[1];
  const label = section ? SECTION_LABELS[section] ?? section : "Dashboard";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbPage>{label}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
