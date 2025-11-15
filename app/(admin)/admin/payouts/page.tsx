import { getAllPendingPayouts } from "@/lib/actions/payout.actions";
import { PayoutsManagement } from "@/components/payouts-management";

export default async function PayoutsManagementPage() {
  const payoutsResult = await getAllPendingPayouts();
  const pendingPayouts = payoutsResult.success ? payoutsResult.data : [];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payout Requests</h1>
        <p className="text-muted-foreground mt-2">
          Review and process user payout requests
        </p>
      </div>

      <PayoutsManagement payouts={pendingPayouts} />
    </div>
  );
}
