import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/database/mongoose";
import { PremiumDepositContent } from "@/components/premium-deposit-content";

export default async function PremiumDepositPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/sign-in");
  }

  // Fetch user data from database
  const mongoose = await connectToDatabase();
  const db = mongoose.connection.db;

  if (!db) {
    throw new Error("Database connection failed");
  }

  const user = await db.collection("user").findOne({ email: session.user.email });

  if (!user || user.accountType !== "premium") {
    redirect("/");
  }

  // If already activated, redirect to home
  if (user.premiumActivatedAt) {
    redirect("/");
  }

  return (
    <PremiumDepositContent
      depositRequired={user.premiumDepositRequired || 15000}
      depositAmount={user.premiumDepositAmount || 0}
      walletAddress={user.premiumWalletAddress || ""}
    />
  );
}
