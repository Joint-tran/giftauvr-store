import { AdminSidebar } from "@/components/admin-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/better-auth/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import React from "react";

const ADMIN_EMAIL = "admin@gmail.com";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  // Check authentication
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Redirect if not authenticated or not admin email
  if (!session?.user || session.user.email !== ADMIN_EMAIL) {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 border-b px-4 backdrop-blur">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center gap-2">
            <h1 className="text-lg font-semibold">Admin Panel</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
