import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { BanWallProvider } from "@/components/ban-wall-provider";
import { KycWallProvider } from "@/components/kyc-wall-provider";
import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { connectToDatabase } from "@/database/mongoose";
import React from "react";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  let user = null;
  const session = await auth.api.getSession({ headers: await headers() });
  if (session?.user) {
    // Fetch full user data from database to get KYC fields
    // Try both 'id' field and '_id' field since they might differ
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    let dbUser = null;
    if (db) {
      // First try by 'id' field (better-auth standard)
      dbUser = await db.collection("user").findOne({ id: session.user.id });
      // If not found, try by email as fallback
      if (!dbUser) {
        dbUser = await db.collection("user").findOne({ email: session.user.email });
      }
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessionUser = session.user as any;
    user = {
      id: sessionUser.id,
      name: sessionUser.name,
      email: sessionUser.email,
      fullName: sessionUser.fullName || dbUser?.fullName,
      country: sessionUser.country || dbUser?.country,
      accountType: sessionUser.accountType || dbUser?.accountType,
      network: sessionUser.network || dbUser?.network,
      usdtWallet: sessionUser.usdtWallet || dbUser?.usdtWallet,
      approvalStatus: sessionUser.approvalStatus || dbUser?.approvalStatus,
      balance: sessionUser.balance ?? dbUser?.balance,
      isBanned: sessionUser.isBanned ?? dbUser?.isBanned,
      banReason: sessionUser.banReason || dbUser?.banReason,
      banContactEmail: sessionUser.banContactEmail || dbUser?.banContactEmail,
      kycRequired: dbUser?.kycRequired ?? false,
      kycStatus: dbUser?.kycStatus,
      kycReason: dbUser?.kycReason,
      // Premium fields
      premiumDepositRequired: dbUser?.premiumDepositRequired,
      premiumDepositAmount: dbUser?.premiumDepositAmount,
      premiumWalletAddress: dbUser?.premiumWalletAddress,
      premiumActivatedAt: dbUser?.premiumActivatedAt,
    };
  }
  return (
    <BanWallProvider user={user}>
      <KycWallProvider user={user}>
        <SidebarProvider>
          <AppSidebar user={user || null} />
          <SidebarInset>
            <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 border-b px-4 backdrop-blur">
              <SidebarTrigger className="-ml-1" />
              <div className="flex flex-1 items-center gap-2">
                <h1 className="text-lg font-semibold">Rumrk</h1>
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </KycWallProvider>
    </BanWallProvider>
  );
};

export default RootLayout;
