import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  let user = null;
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user) {
    user = {
      id: session?.user.id,
      name: session?.user.name,
      email: session?.user.email,
      fullName: session?.user.fullName,
      country: session?.user.country,
      accountType: session?.user.accountType,
      network: session?.user.network,
      usdtWallet: session?.user.usdtWallet,
      approvalStatus: session?.user.approvalStatus,
      balance: session?.user.balance,
    };
  }
  return (
    <SidebarProvider>
      <AppSidebar user={user || null} />
      <SidebarInset>
        <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 border-b px-4 backdrop-blur">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center gap-2">
            <h1 className="text-lg font-semibold">Giftauvr</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default RootLayout;
