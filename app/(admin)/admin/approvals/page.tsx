import { getPendingUsers } from "@/lib/actions/admin.actions";
import { ApprovalsList } from "@/components/approvals-list";

export default async function ApprovalsPage() {
  const result = await getPendingUsers();

  if (!result.success || !result.data) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Phê duyệt tài khoản
          </h2>
          <p className="text-muted-foreground">
            Quản lý yêu cầu phê duyệt từ người dùng
          </p>
        </div>
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">Không thể tải danh sách user</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Phê duyệt tài khoản
        </h2>
        <p className="text-muted-foreground">
          Quản lý yêu cầu phê duyệt từ người dùng
        </p>
      </div>

      {result.data.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="text-muted-foreground">
            Không có yêu cầu phê duyệt nào
          </p>
        </div>
      ) : (
        <ApprovalsList users={result.data} />
      )}
    </div>
  );
}
