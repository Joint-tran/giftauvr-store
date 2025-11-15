import { getAllPendingEgifts } from "@/lib/actions/egift.actions";
import { EgiftsManagement } from "@/components/egifts-management";

export default async function EgiftsManagementPage() {
  const egiftsResult = await getAllPendingEgifts();
  const pendingEgifts = egiftsResult.success ? egiftsResult.data : [];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Gift Cards Management
        </h1>
        <p className="text-muted-foreground mt-2">
          Review and purchase gift cards from sellers
        </p>
      </div>

      <EgiftsManagement egifts={pendingEgifts} />
    </div>
  );
}
