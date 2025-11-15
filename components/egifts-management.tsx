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
import { approveEgift, rejectEgift } from "@/lib/actions/egift.actions";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  User,
  Mail,
  DollarSign,
  CreditCard,
} from "lucide-react";

interface EgiftsManagementProps {
  egifts: any[];
}

export function EgiftsManagement({ egifts }: EgiftsManagementProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEgift, setSelectedEgift] = useState<any>(null);
  const [action, setAction] = useState<"approve" | "reject">("approve");

  const openDialog = (egift: any, actionType: "approve" | "reject") => {
    setSelectedEgift(egift);
    setAction(actionType);
    setDialogOpen(true);
  };

  const handleAction = async () => {
    if (!selectedEgift) return;

    const egiftId = selectedEgift._id?.toString() || selectedEgift.id;

    setLoadingId(egiftId);
    setDialogOpen(false);

    const result =
      action === "approve"
        ? await approveEgift(egiftId)
        : await rejectEgift(egiftId, "Does not meet requirements");

    if (result.success) {
      alert(result.message);
      router.refresh();
    } else {
      alert(result.error);
    }
    setLoadingId(null);
  };

  return (
    <>
      <div className="grid gap-6">
        {egifts.length === 0 ? (
          <Card>
            <CardContent className="pt-12 pb-12">
              <div className="text-center text-muted-foreground">
                <ShoppingBag className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>No pending gift cards</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                Pending Gift Cards ({egifts.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {egifts.map((egift) => {
                const egiftId = egift._id?.toString() || egift.id;
                const discount = (
                  ((egift.value - egift.sellingPrice) / egift.value) *
                  100
                ).toFixed(1);

                return (
                  <Card key={egiftId} className="border-2">
                    <CardContent className="pt-6 space-y-4">
                      {/* Seller Info */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">
                              {egift.sellerName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {egift.sellerEmail}
                          </div>
                        </div>
                        <Badge variant="secondary">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      </div>

                      {/* Category Info */}
                      <div className="p-3 bg-muted rounded-lg space-y-2">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-primary" />
                          <span className="font-mono font-semibold">
                            {egift.categoryId}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Submitted:{" "}
                          {new Date(egift.createdAt).toLocaleString()}
                        </div>
                      </div>

                      {/* Card Details */}
                      <div className="space-y-2 text-sm">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <span className="text-muted-foreground">
                              Card Value:
                            </span>
                            <div className="font-semibold text-lg">
                              ${egift.value.toFixed(2)}
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Selling Price:
                            </span>
                            <div className="font-semibold text-lg text-primary">
                              ${egift.sellingPrice.toFixed(2)}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-green-600">
                            {discount}% Discount
                          </Badge>
                        </div>

                        <div className="pt-2 space-y-2 border-t">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Card Code:
                            </span>
                            <span className="font-mono font-semibold">
                              {egift.cardCode}
                            </span>
                          </div>
                          {egift.pin && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                PIN:
                              </span>
                              <span className="font-mono font-semibold">
                                {egift.pin}
                              </span>
                            </div>
                          )}
                          {egift.expiryDate && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Expires:
                              </span>
                              <span>
                                {new Date(
                                  egift.expiryDate
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>

                        {egift.notes && (
                          <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded text-xs">
                            <strong>Notes:</strong> {egift.notes}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={() => openDialog(egift, "approve")}
                          disabled={loadingId === egiftId}
                          className="flex-1"
                          variant="default"
                        >
                          {loadingId === egiftId && action === "approve" ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Purchase - ${egift.sellingPrice.toFixed(2)}
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={() => openDialog(egift, "reject")}
                          disabled={loadingId === egiftId}
                          className="flex-1"
                          variant="destructive"
                        >
                          {loadingId === egiftId && action === "reject" ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <XCircle className="mr-2 h-4 w-4" />
                              Reject
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {action === "approve" ? "Purchase Gift Card" : "Reject Gift Card"}
            </DialogTitle>
            <DialogDescription asChild>
              {action === "approve" ? (
                <div className="space-y-2">
                  <div>
                    Purchase this gift card from{" "}
                    <strong>{selectedEgift?.sellerName}</strong>?
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-semibold">
                        ${selectedEgift?.sellingPrice.toFixed(2)} will be added
                        to seller&apos;s balance
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-red-600">
                  Reject gift card from{" "}
                  <strong>{selectedEgift?.sellerName}</strong>?
                </div>
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
