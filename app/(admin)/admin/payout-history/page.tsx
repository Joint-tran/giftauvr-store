import { getAllUsersForPicker } from "@/lib/actions/payout.actions";
import { AdminAddPayoutHistory } from "@/components/admin-add-payout-history";

export default async function AdminPayoutHistoryPage() {
  const usersResult = await getAllUsersForPicker();
  const users = usersResult.success ? usersResult.data : [];

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Add Payout History
        </h1>
        <p className="text-muted-foreground mt-2">
          Manually add a completed payout record for a user
        </p>
      </div>

      <AdminAddPayoutHistory users={users} />
    </div>
  );
}
