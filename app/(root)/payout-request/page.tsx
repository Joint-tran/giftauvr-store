import { auth } from "@/lib/better-auth/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { PayoutRequestForm } from "@/components/payout-request-form";
import { MyPayoutRequests } from "@/components/my-payout-requests";
import { DepositPaywall } from "@/components/deposit-paywall";
import { getMyPayoutRequests } from "@/lib/actions/payout.actions";

export default async function PayoutRequestPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const user = {
    id: session.user.id,
    fullName: (session.user as any).fullName || session.user.name || "",
    email: session.user.email,
    balance: (session.user as any).balance || 0,
    usdtWallet: (session.user as any).usdtWallet || "",
    network: (session.user as any).network || "",
    approvalStatus: (session.user as any).approvalStatus || "pending",
  };

  const payoutsResult = await getMyPayoutRequests();
  const myPayouts = payoutsResult.success ? payoutsResult.data : [];

  // Show deposit paywall for pending users
  if (user.approvalStatus === "pending") {
    return (
      <div className="p-6 space-y-6 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payout Request</h1>
          <p className="text-muted-foreground mt-2">
            Request withdrawal from your balance
          </p>
        </div>

        <DepositPaywall user={user} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payout Request</h1>
        <p className="text-muted-foreground mt-2">
          Request withdrawal from your balance
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PayoutRequestForm user={user} />
        <MyPayoutRequests payouts={myPayouts} />
      </div>
    </div>
  );
}
