"use client";

import { useState, useMemo } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  approveEgift,
  rejectEgift,
  bulkApproveEgifts,
  bulkRejectEgifts,
} from "@/lib/actions/egift.actions";
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
  CheckSquare,
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
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isBulkLoading, setIsBulkLoading] = useState(false);
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [bulkAction, setBulkAction] = useState<"approve" | "reject">("approve");

  // Group egifts by selling price
  const egiftsByPrice = useMemo(() => {
    const grouped = new Map<number, any[]>();
    egifts.forEach((egift) => {
      const price = egift.sellingPrice;
      if (!grouped.has(price)) {
        grouped.set(price, []);
      }
      grouped.get(price)?.push(egift);
    });
    return grouped;
  }, [egifts]);

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

  // Toggle individual egift selection
  const toggleSelection = (egiftId: string) => {
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(egiftId)) {
        newSet.delete(egiftId);
      } else {
        newSet.add(egiftId);
      }
      return newSet;
    });
  };

  // Select all egifts with a specific selling price
  const selectByPrice = (price: number) => {
    const egiftsWithPrice = egiftsByPrice.get(price) || [];
    const idsWithPrice = egiftsWithPrice.map((e) => e._id?.toString() || e.id);
    setSelectedIds((prev) => {
      const newSet = new Set(prev);
      const allSelected = idsWithPrice.every((id) => newSet.has(id));

      if (allSelected) {
        // Deselect all with this price
        idsWithPrice.forEach((id) => newSet.delete(id));
      } else {
        // Select all with this price
        idsWithPrice.forEach((id) => newSet.add(id));
      }
      return newSet;
    });
  };

  // Open bulk action dialog
  const openBulkDialog = (actionType: "approve" | "reject") => {
    if (selectedIds.size === 0) {
      alert("Please select at least one gift card");
      return;
    }
    setBulkAction(actionType);
    setBulkDialogOpen(true);
  };

  // Handle bulk action
  const handleBulkAction = async () => {
    if (selectedIds.size === 0) return;

    setIsBulkLoading(true);
    setBulkDialogOpen(false);

    const idsArray = Array.from(selectedIds);
    const result =
      bulkAction === "approve"
        ? await bulkApproveEgifts(idsArray)
        : await bulkRejectEgifts(idsArray, "Does not meet requirements");

    if (result.success) {
      alert(result.message);
      setSelectedIds(new Set());
      router.refresh();
    } else {
      alert(result.error || "Error processing bulk action");
    }

    setIsBulkLoading(false);
  };

  // Calculate total amount for selected egifts
  const selectedTotal = useMemo(() => {
    return egifts
      .filter((e) => selectedIds.has(e._id?.toString() || e.id))
      .reduce((sum, e) => sum + e.sellingPrice, 0);
  }, [egifts, selectedIds]);

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
          <>
            {/* Bulk Actions Bar */}
            {selectedIds.size > 0 && (
              <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <CheckSquare className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="font-semibold">
                          {selectedIds.size} gift card(s) selected
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Total value: ${selectedTotal.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => openBulkDialog("approve")}
                        disabled={isBulkLoading}
                        variant="default"
                      >
                        {isBulkLoading && bulkAction === "approve" ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Bulk Approve
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={() => openBulkDialog("reject")}
                        disabled={isBulkLoading}
                        variant="destructive"
                      >
                        {isBulkLoading && bulkAction === "reject" ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <XCircle className="mr-2 h-4 w-4" />
                            Bulk Reject
                          </>
                        )}
                      </Button>
                      <Button
                        onClick={() => setSelectedIds(new Set())}
                        variant="outline"
                      >
                        Clear Selection
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Price Group Filters */}
            {egiftsByPrice.size > 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Select by Selling Price
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(egiftsByPrice.entries())
                      .sort(([a], [b]) => a - b)
                      .map(([price, priceEgifts]) => {
                        const idsWithPrice = priceEgifts.map(
                          (e) => e._id?.toString() || e.id
                        );
                        const allSelected = idsWithPrice.every((id) =>
                          selectedIds.has(id)
                        );
                        return (
                          <Button
                            key={price}
                            onClick={() => selectByPrice(price)}
                            variant={allSelected ? "default" : "outline"}
                            size="sm"
                          >
                            ${price.toFixed(2)} ({priceEgifts.length})
                          </Button>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            )}

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
                  const isSelected = selectedIds.has(egiftId);

                  return (
                    <Card
                      key={egiftId}
                      className={`border-2 ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                          : ""
                      }`}
                    >
                      <CardContent className="pt-6 space-y-4">
                        {/* Checkbox & Seller Info */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3 flex-1">
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => toggleSelection(egiftId)}
                              className="mt-1"
                            />
                            <div className="space-y-1 flex-1">
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
          </>
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

      {/* Bulk Confirmation Dialog */}
      <Dialog open={bulkDialogOpen} onOpenChange={setBulkDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {bulkAction === "approve"
                ? "Bulk Purchase Gift Cards"
                : "Bulk Reject Gift Cards"}
            </DialogTitle>
            <DialogDescription asChild>
              {bulkAction === "approve" ? (
                <div className="space-y-2">
                  <div>
                    Purchase <strong>{selectedIds.size}</strong> gift card(s)?
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                      <DollarSign className="h-4 w-4" />
                      <span className="font-semibold">
                        ${selectedTotal.toFixed(2)} will be added to
                        sellers&apos; balances
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-red-600">
                  Reject <strong>{selectedIds.size}</strong> gift card(s)?
                </div>
              )}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setBulkDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleBulkAction}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
