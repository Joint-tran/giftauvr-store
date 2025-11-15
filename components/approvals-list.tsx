"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { approveUser, rejectUser } from "@/lib/actions/admin.actions";
import {
  CheckCircle,
  XCircle,
  User,
  Mail,
  DollarSign,
  Hash,
  Calendar,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ApprovalsListProps {
  users: any[];
}

export function ApprovalsList({ users }: ApprovalsListProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [dialogAction, setDialogAction] = useState<"approve" | "reject">(
    "approve"
  );

  const handleApprove = async (userId: string) => {
    setLoadingId(userId);
    const result = await approveUser(userId);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
    setLoadingId(null);
  };

  const handleReject = async (userId: string) => {
    setLoadingId(userId);
    const result = await rejectUser(userId);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
    setLoadingId(null);
  };

  const openDialog = (user: any, action: "approve" | "reject") => {
    setSelectedUser(user);
    setDialogAction(action);
    setDialogOpen(true);
  };

  const confirmAction = () => {
    if (!selectedUser) return;

    const userId = selectedUser.id || selectedUser._id?.toString();
    if (!userId) return;

    if (dialogAction === "approve") {
      handleApprove(userId);
    } else {
      handleReject(userId);
    }
    setDialogOpen(false);
  };

  return (
    <>
      <div className="grid gap-4">
        {users.map((user) => {
          const depositAmount = user.depositAmount || 0;
          const userId = user.id || user._id?.toString();

          return (
            <Card key={userId}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      {user.fullName || user.name}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {user.email}
                    </div>
                  </div>
                  <Badge variant="default">{user.accountType}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      Số tiền đã nộp:
                    </span>
                    <span className="font-semibold">${depositAmount} USDT</span>
                  </div>

                  {user.depositTransactionHash && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Hash className="h-4 w-4" />
                        Transaction Hash:
                      </span>
                      <span className="font-mono text-xs truncate max-w-[200px]">
                        {user.depositTransactionHash}
                      </span>
                    </div>
                  )}

                  {user.usdtWallet && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        USDT Wallet:
                      </span>
                      <span className="font-mono text-xs truncate max-w-[200px]">
                        {user.usdtWallet}
                      </span>
                    </div>
                  )}

                  {user.network && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Network:</span>
                      <span>{user.network}</span>
                    </div>
                  )}

                  {user.country && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Country:</span>
                      <span>{user.country}</span>
                    </div>
                  )}

                  {user.createdAt && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        Ngày đăng ký:
                      </span>
                      <span>
                        {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => openDialog(user, "approve")}
                    disabled={loadingId === userId}
                    className="flex-1"
                    variant="default"
                  >
                    {loadingId === userId ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Phê duyệt
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => openDialog(user, "reject")}
                    disabled={loadingId === userId}
                    className="flex-1"
                    variant="destructive"
                  >
                    {loadingId === userId ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <XCircle className="mr-2 h-4 w-4" />
                        Từ chối
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dialogAction === "approve" ? "Phê duyệt" : "Từ chối"} tài khoản
            </AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn{" "}
              {dialogAction === "approve" ? "phê duyệt" : "từ chối"} tài khoản
              của{" "}
              <strong>{selectedUser?.fullName || selectedUser?.name}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Huỷ</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAction}>
              Xác nhận
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
