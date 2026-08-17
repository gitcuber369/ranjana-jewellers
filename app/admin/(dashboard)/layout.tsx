import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChevronsUpDown } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { NavLinks } from "@/components/admin/nav-links";
import { Breadcrumbs } from "@/components/admin/breadcrumbs";
import { AccountMenu } from "@/components/admin/account-menu";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <Link
              href="/admin"
              className="flex items-center gap-2 rounded-md border px-2 py-1.5 hover:bg-sidebar-accent"
            >
              <Image src="/logo.png" alt="" width={32} height={32} className="size-8 shrink-0 object-contain" />
              <div className="flex min-w-0 flex-1 flex-col leading-tight">
                <span className="truncate text-sm font-semibold tracking-tight">Ranjana Jewellers</span>
                <span className="truncate text-xs text-muted-foreground">Jewellery CRM</span>
              </div>
              <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <NavLinks />
          </SidebarContent>
          <SidebarSeparator />
          <SidebarFooter>
            <AccountMenu email={user?.email ?? null} />
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 items-center gap-2 border-b px-4">
            <SidebarTrigger />
            <Breadcrumbs />
          </header>
          <main className="p-6">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
