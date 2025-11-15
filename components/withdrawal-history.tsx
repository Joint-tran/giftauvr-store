"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  History,
  Clock,
  CheckCircle,
  XCircle,
  ArrowDownToLine,
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

                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>
                        {new Date(withdrawal.createdAt).toLocaleDateString()}
                      </span>
                    </div>
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
