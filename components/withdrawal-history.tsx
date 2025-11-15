"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  History,
  Clock,
  CheckCircle,
  XCircle,
  ArrowDownToLine,
  Wallet,
  Globe,
} from "lucide-react";

interface WithdrawalHistoryProps {
  withdrawals: any[];
}

export function WithdrawalHistory({ withdrawals }: WithdrawalHistoryProps) {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Withdrawal History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {withdrawals.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <ArrowDownToLine className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>No withdrawal requests yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {withdrawals.map((withdrawal) => {
              const statusConfig = getStatusConfig(withdrawal.status);
              const StatusIcon = statusConfig.icon;
              const withdrawalId = withdrawal._id?.toString() || withdrawal.id;

              return (
                <div
                  key={withdrawalId}
                  className="p-4 border rounded-lg space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-lg">
                        ${withdrawal.amount.toFixed(2)} USDT
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusIcon className={`h-4 w-4 ${statusConfig.color}`} />
                      <Badge variant={statusConfig.variant}>
                        {statusConfig.label}
                      </Badge>
                    </div>
                  </div>

                  <div className="text-xs space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>
                        {new Date(withdrawal.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Wallet Address - Full Display */}
                    {withdrawal.walletAddress && (
                      <div className="p-2 bg-muted/50 rounded border">
                        <div className="flex items-center gap-2 mb-1">
                          <Wallet className="h-3 w-3 text-muted-foreground" />
                          <span className="text-muted-foreground font-medium">
                            Wallet Address:
                          </span>
                        </div>
                        <div className="font-mono text-xs break-all pl-5">
                          {withdrawal.walletAddress}
                        </div>
                      </div>
                    )}

                    {/* Network - Full Display */}
                    {withdrawal.network && (
                      <div className="flex items-center gap-2 pl-2">
                        <Globe className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">Network:</span>
                        <Badge variant="outline" className="text-xs">
                          {withdrawal.network}
                        </Badge>
                      </div>
                    )}

                    {/* Transaction Hash if completed */}
                    {withdrawal.transactionHash && (
                      <div className="p-2 bg-green-500/10 rounded border border-green-500/20">
                        <div className="text-muted-foreground font-medium mb-1">
                          Transaction Hash:
                        </div>
                        <div className="font-mono text-xs break-all text-green-700 dark:text-green-400">
                          {withdrawal.transactionHash}
                        </div>
                      </div>
                    )}

                    {/* Rejection Reason if rejected */}
                    {withdrawal.rejectionReason && (
                      <div className="p-2 bg-red-500/10 rounded border border-red-500/20">
                        <div className="text-muted-foreground font-medium mb-1">
                          Rejection Reason:
                        </div>
                        <div className="text-xs text-red-700 dark:text-red-400">
                          {withdrawal.rejectionReason}
                        </div>
                      </div>
                    )}

                    {/* Notes if available */}
                    {withdrawal.notes && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Notes:</span>
                        <span className="text-right max-w-[60%]">
                          {withdrawal.notes}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
