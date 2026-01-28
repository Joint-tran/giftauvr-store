import { auth } from "@/lib/better-auth/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { SellEgiftForm } from "@/components/sell-egift-form";
import { MyEgiftsList } from "@/components/my-egifts-list";
import { getMyEgifts } from "@/lib/actions/egift.actions";
import { connectToDatabase } from "@/database/mongoose";

export default async function SellPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  // Fetch user data from database for premium status
  const mongoose = await connectToDatabase();
  const db = mongoose.connection.db;
  const dbUser = db ? await db.collection("user").findOne({ email: session.user.email }) : null;

  const accountType = dbUser?.accountType?.toLowerCase() || (session.user as any).accountType?.toLowerCase();
  const isPremium = accountType === "premium";
  const isSeller = accountType === "seller";
  const isPremiumPending = isPremium && !dbUser?.premiumActivatedAt;

  // Check if user is a seller or premium
  if (!isSeller && !isPremium) {
    redirect("/");
  }

  const approvalStatus = (session.user as any).approvalStatus || "pending";

  const egiftsResult = await getMyEgifts();
  const myEgifts = egiftsResult.success ? egiftsResult.data : [];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sell Gift Cards</h1>
        <p className="text-muted-foreground mt-2">
          List your gift cards for sale
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SellEgiftForm approvalStatus={approvalStatus} isPremiumPending={isPremiumPending} />
        <MyEgiftsList egifts={myEgifts} />
      </div>
    </div>
  );
}
