"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";

interface MyEgiftsListProps {
  egifts: any[];
}

export function MyEgiftsList({ egifts }: MyEgiftsListProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "sold":
        return {
          label: "Sold",
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
          label: "Pending Review",
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
          <Package className="h-5 w-5" />
          My Listings ({egifts.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {egifts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>No gift cards listed yet</p>
            <p className="text-sm mt-2">
              Submit your first gift card using the form
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {egifts.map((egift) => {
              const statusConfig = getStatusConfig(egift.status);
              const StatusIcon = statusConfig.icon;
              const egiftId = egift._id?.toString() || egift.id;
              const discount = (
                ((egift.value - egift.sellingPrice) / egift.value) *
                100
              ).toFixed(1);

              return (
                <div
                  key={egiftId}
                  className="p-4 border rounded-lg space-y-3 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="font-semibold font-mono">
                        {egift.categoryId}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusIcon className={`h-4 w-4 ${statusConfig.color}`} />
                      <Badge variant={statusConfig.variant}>
                        {statusConfig.label}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Value:</span>
                      <div className="font-semibold">
                        ${egift.value.toFixed(2)}
                      </div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Selling:</span>
                      <div className="font-semibold text-primary">
                        ${egift.sellingPrice.toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <Badge variant="outline" className="text-green-600">
                      {discount}% OFF
                    </Badge>
                    <span className="text-muted-foreground">
                      {new Date(egift.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {egift.status === "rejected" && egift.rejectionReason && (
                    <div className="text-xs text-red-600 bg-red-50 dark:bg-red-950 p-2 rounded">
                      <strong>Reason:</strong> {egift.rejectionReason}
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
