"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { updateWithdrawalStatus } from "@/lib/actions/withdrawal.actions";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Clock, Loader2, User, Mail } from "lucide-react";

interface WithdrawalsManagementProps {
  withdrawals: any[];
}

export function WithdrawalsManagement({
  withdrawals,
}: WithdrawalsManagementProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState<any>(null);
  const [action, setAction] = useState<"approve" | "reject" | "complete">(
    "approve"
  );

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return {
          label: "Completed",
          variant: "default" as const,
          icon: CheckCircle,
          color: "text-green-600",
        };
      case "approved":
        return {
          label: "Approved",
          variant: "default" as const,
          icon: CheckCircle,
          color: "text-blue-600",
        };
      case "rejected":
        return {
          label: "Rejected",
          variant: "destructive" as const,
          icon: XCircle,
          color: "text-red-600",
        };
      default:
        return {
          label: "Pending",
          variant: "secondary" as const,
          icon: Clock,
          color: "text-yellow-600",
        };
    }
  };

  const openDialog = (
    withdrawal: any,
    actionType: "approve" | "reject" | "complete"
  ) => {
    setSelectedWithdrawal(withdrawal);
    setAction(actionType);
    setDialogOpen(true);
  };

  const handleAction = async () => {
    if (!selectedWithdrawal) return;

    const withdrawalId =
      selectedWithdrawal._id?.toString() || selectedWithdrawal.id;

    setLoadingId(withdrawalId);
    setDialogOpen(false);

    const status =
      action === "complete"
        ? "completed"
        : action === "approve"
        ? "approved"
        : "rejected";

    const result = await updateWithdrawalStatus(withdrawalId, status);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error);
    }
    setLoadingId(null);
  };

  const pendingWithdrawals = withdrawals.filter((w) => w.status === "pending");
  const approvedWithdrawals = withdrawals.filter(
    (w) => w.status === "approved"
  );
  const completedWithdrawals = withdrawals.filter(
    (w) => w.status === "completed" || w.status === "rejected"
  );

  return (
    <>
      <div className="grid gap-6">
        {/* Pending Requests */}
        {pendingWithdrawals.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                Pending Requests ({pendingWithdrawals.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingWithdrawals.map((withdrawal) => {
                const withdrawalId =
                  withdrawal._id?.toString() || withdrawal.id;
                const statusConfig = getStatusConfig(withdrawal.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <Card key={withdrawalId} className="border-2">
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">
                              {withdrawal.userName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {withdrawal.userEmail}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusIcon
                            className={`h-4 w-4 ${statusConfig.color}`}
                          />
                          <Badge variant={statusConfig.variant}>
                            {statusConfig.label}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Amount:</span>
                          <span className="font-bold text-lg">
                            ${withdrawal.amount.toFixed(2)} USDT
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Date:</span>
                          <span>
                            {new Date(withdrawal.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={() => openDialog(withdrawal, "approve")}
                          disabled={loadingId === withdrawalId}
                          className="flex-1"
                          variant="default"
                        >
                          {loadingId === withdrawalId ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Approve
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={() => openDialog(withdrawal, "reject")}
                          disabled={loadingId === withdrawalId}
                          className="flex-1"
                          variant="destructive"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Approved - Awaiting Completion */}
        {approvedWithdrawals.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                Approved - Awaiting Transfer ({approvedWithdrawals.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {approvedWithdrawals.map((withdrawal) => {
                const withdrawalId =
                  withdrawal._id?.toString() || withdrawal.id;

                return (
                  <Card key={withdrawalId} className="border-2 border-blue-200">
                    <CardContent className="pt-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-semibold">
                            {withdrawal.userName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {withdrawal.userEmail}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">
                            ${withdrawal.amount.toFixed(2)} USDT
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={() => openDialog(withdrawal, "complete")}
                        disabled={loadingId === withdrawalId}
                        className="w-full"
                      >
                        {loadingId === withdrawalId ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark as Completed
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        )}

        {/* Completed/Rejected History */}
        {completedWithdrawals.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>History ({completedWithdrawals.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {completedWithdrawals.map((withdrawal) => {
                  const withdrawalId =
                    withdrawal._id?.toString() || withdrawal.id;
                  const statusConfig = getStatusConfig(withdrawal.status);

                  return (
                    <div
                      key={withdrawalId}
                      className="flex items-center justify-between p-3 border rounded-lg text-sm"
                    >
                      <div>
                        <div className="font-medium">{withdrawal.userName}</div>
                        <div className="text-xs text-muted-foreground">
                          ${withdrawal.amount.toFixed(2)} USDT
                        </div>
                      </div>
                      <Badge variant={statusConfig.variant}>
                        {statusConfig.label}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Action Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {action === "approve"
                ? "Approve Withdrawal"
                : action === "reject"
                ? "Reject Withdrawal"
                : "Complete Withdrawal"}
            </DialogTitle>
            <DialogDescription>
              {action === "approve" && (
                <span>
                  Approve withdrawal request from{" "}
                  <strong>{selectedWithdrawal?.userName}</strong>?
                </span>
              )}
              {action === "reject" && (
                <span className="text-red-600">
                  Reject withdrawal request from{" "}
                  <strong>{selectedWithdrawal?.userName}</strong>? The amount
                  will be refunded to their account.
                </span>
              )}
              {action === "complete" && (
                <span>
                  Mark withdrawal as completed for{" "}
                  <strong>{selectedWithdrawal?.userName}</strong>?
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAction}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
