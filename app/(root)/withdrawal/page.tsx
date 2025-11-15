import { auth } from "@/lib/better-auth/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { WithdrawalForm } from "@/components/withdrawal-form";
import { WithdrawalHistory } from "@/components/withdrawal-history";
import { getUserWithdrawals } from "@/lib/actions/withdrawal.actions";

export default async function WithdrawalPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const withdrawalsResult = await getUserWithdrawals();
  const withdrawals = withdrawalsResult.success ? withdrawalsResult.data : [];

  const user = {
    id: session.user.id,
    email: session.user.email,
    balance: session.user.balance || 0,
    usdtWallet: session.user.usdtWallet,
    network: session.user.network || "TRC20",
  };

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Withdrawal</h1>
        <p className="text-muted-foreground mt-2">
          Request a withdrawal from your account
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <WithdrawalForm user={user} />
        <WithdrawalHistory withdrawals={withdrawals} />
      </div>
    </div>
  );
}
