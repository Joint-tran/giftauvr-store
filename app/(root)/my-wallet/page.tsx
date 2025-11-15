import { auth } from "@/lib/better-auth/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { WalletInfo } from "@/components/wallet-info";

export default async function MyWalletPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const user = {
    id: session.user.id,
    email: session.user.email,
    fullName: session.user.fullName,
    accountType: session.user.accountType,
    country: session.user.country,
    network: session.user.network,
    usdtWallet: session.user.usdtWallet,
    balance: session.user.balance || 0,
    depositAmount: session.user.depositAmount || 0,
    depositTransactionHash: session.user.depositTransactionHash,
    approvalStatus: session.user.approvalStatus,
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Wallet</h1>
        <p className="text-muted-foreground mt-2">
          Information about your wallet and transactions
        </p>
      </div>

      <WalletInfo user={user} />
    </div>
  );
}
