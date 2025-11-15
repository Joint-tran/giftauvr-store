import { getAllWithdrawals } from "@/lib/actions/withdrawal.actions";
import { WithdrawalsManagement } from "@/components/withdrawals-management";

export default async function WithdrawalsPage() {
  const result = await getAllWithdrawals();
  const withdrawals = result.success ? result.data : [];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Withdrawals</h1>
        <p className="text-muted-foreground mt-2">
          Manage user withdrawal requests
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Total: <span className="font-semibold">{withdrawals.length}</span>{" "}
          requests
        </div>
      </div>

      <WithdrawalsManagement withdrawals={withdrawals} />
    </div>
  );
}
