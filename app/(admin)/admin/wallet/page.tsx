import { getAllUsers } from "@/lib/actions/admin.actions";
import { WalletUpdateForm } from "@/components/wallet-update-form";

export default async function WalletPage() {
  const result = await getAllUsers();
  const users = result.success ? result.data : [];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cập nhật Wallet</h1>
        <p className="text-muted-foreground mt-2">
          Cập nhật thông tin nạp tiền cho user
        </p>
      </div>

      <WalletUpdateForm users={users} />
    </div>
  );
}
