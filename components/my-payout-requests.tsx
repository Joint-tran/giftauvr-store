"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, Clock, CheckCircle, XCircle, DollarSign } from "lucide-react";

interface MyPayoutRequestsProps {
  payouts: any[];
}

export function MyPayoutRequests({ payouts }: MyPayoutRequestsProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return {
          label: "Completed",
          variant: "default" as const,
          icon: CheckCircle,
          color: "text-green-600",
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
          My Requests ({payouts.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {payouts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <History className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>No payout requests yet</p>
            <p className="text-sm mt-2">
              Submit your first payout request using the form
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {payouts.map((payout) => {
              const statusConfig = getStatusConfig(payout.status);
              const StatusIcon = statusConfig.icon;
              const payoutId = payout._id?.toString() || payout.id;

              return (
                <div
                  key={payoutId}
                  className="p-4 border rounded-lg space-y-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      <span className="text-2xl font-bold text-primary">
                        {payout.amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusIcon className={`h-4 w-4 ${statusConfig.color}`} />
                      <Badge variant={statusConfig.variant}>
                        {statusConfig.label}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Wallet:</span>
                      <span className="font-mono font-semibold text-[9px] truncate w-[200px]">
                        {payout.walletAddress}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Network:</span>
                      <span className="font-semibold">{payout.network}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Requested:</span>
                      <span>
                        {new Date(payout.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {payout.notes && (
                    <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
                      <strong>Notes:</strong> {payout.notes}
                    </div>
                  )}

                  {payout.status === "rejected" && payout.rejectionReason && (
                    <div className="text-xs text-red-600 bg-red-50 dark:bg-red-950 p-2 rounded">
                      <strong>Rejection Reason:</strong>{" "}
                      {payout.rejectionReason}
                    </div>
                  )}

                  {payout.status === "completed" && payout.completedAt && (
                    <div className="text-xs text-muted-foreground">
                      Completed: {new Date(payout.completedAt).toLocaleString()}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
