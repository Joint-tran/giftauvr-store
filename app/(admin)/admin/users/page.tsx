import { getAllUsers } from "@/lib/actions/admin.actions";
import { UsersList } from "@/components/users-list";

export default async function UsersPage() {
  const result = await getAllUsers();
  const users = result.success ? result.data : [];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quản lý Users</h1>
        <p className="text-muted-foreground mt-2">
          Danh sách tất cả users trong hệ thống
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Tổng số: <span className="font-semibold">{users.length}</span> users
        </div>
      </div>

      <UsersList users={users} />
    </div>
  );
}
