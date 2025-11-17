import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { BanWallProvider } from "@/components/ban-wall-provider";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import React from "react";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  let user = null;
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessionUser = session.user as any;
    user = {
      id: sessionUser.id,
      name: sessionUser.name,
      email: sessionUser.email,
      fullName: sessionUser.fullName,
      country: sessionUser.country,
      accountType: sessionUser.accountType,
      network: sessionUser.network,
      usdtWallet: sessionUser.usdtWallet,
      approvalStatus: sessionUser.approvalStatus,
      balance: sessionUser.balance,
      isBanned: sessionUser.isBanned,
      banReason: sessionUser.banReason,
      banContactEmail: sessionUser.banContactEmail,
    };
  }
  return (
    <BanWallProvider user={user}>
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
    </BanWallProvider>
  );
};

export default RootLayout;
