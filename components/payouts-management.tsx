"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { completePayout, rejectPayout } from "@/lib/actions/payout.actions";
import { useRouter } from "next/navigation";
import {
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  User,
  Mail,
  Wallet,
  Globe,
} from "lucide-react";

interface PayoutsManagementProps {
  payouts: any[];
}

export function PayoutsManagement({ payouts }: PayoutsManagementProps) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState<any>(null);
  const [transactionHash, setTransactionHash] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  const openCompleteDialog = (payout: any) => {
    setSelectedPayout(payout);
    setTransactionHash("");
    setDialogOpen(true);
  };

  const openRejectDialog = (payout: any) => {
    setSelectedPayout(payout);
    setRejectionReason("");
    setRejectDialogOpen(true);
  };

  const handleComplete = async () => {
    if (!selectedPayout || !transactionHash.trim()) {
      alert("Please enter transaction hash");
      return;
    }

    const payoutId = selectedPayout._id?.toString() || selectedPayout.id;

    setLoadingId(payoutId);
    setDialogOpen(false);

    const result = await completePayout(payoutId, transactionHash);

    if (result.success) {
      alert(result.message);
      router.refresh();
    } else {
      alert(result.error);
    }
    setLoadingId(null);
  };

  const handleReject = async () => {
    if (!selectedPayout) return;

    const payoutId = selectedPayout._id?.toString() || selectedPayout.id;

    setLoadingId(payoutId);
    setRejectDialogOpen(false);

    const result = await rejectPayout(payoutId, rejectionReason || undefined);

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
        {payouts.length === 0 ? (
          <Card>
            <CardContent className="pt-12 pb-12">
              <div className="text-center text-muted-foreground">
                <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>No pending payout requests</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                Pending Payouts ({payouts.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {payouts.map((payout) => {
                const payoutId = payout._id?.toString() || payout.id;
                const isProcessing = loadingId === payoutId;

                return (
                  <Card key={payoutId} className="border-2">
                    <CardContent className="pt-6 space-y-4">
                      {/* User Info */}
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">
                              {payout.userName}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            {payout.userEmail}
                          </div>
                        </div>
                        <Badge variant="secondary">
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      </div>

                      {/* Amount */}
                      <div className="p-4 bg-primary/10 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Payout Amount
                          </span>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-6 w-6 text-primary" />
                            <span className="text-3xl font-bold text-primary">
                              {payout.amount.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Wallet Details */}
                      <div className="space-y-2 text-sm bg-muted p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Wallet className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Wallet Address:
                          </span>
                        </div>
                        <div className="font-mono font-semibold break-all">
                          {payout.walletAddress}
                        </div>
                        <div className="flex items-center gap-2 pt-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            Network:
                          </span>
                          <span className="font-semibold">
                            {payout.network}
                          </span>
                        </div>
                      </div>

                      {/* Request Info */}
                      <div className="text-xs text-muted-foreground">
                        Requested: {new Date(payout.createdAt).toLocaleString()}
                      </div>

                      {payout.notes && (
                        <div className="p-2 bg-blue-50 dark:bg-blue-950 rounded text-xs">
                          <strong>User Notes:</strong> {payout.notes}
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={() => openCompleteDialog(payout)}
                          disabled={isProcessing}
                          className="flex-1"
                          variant="default"
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Complete Payout
                            </>
                          )}
                        </Button>
                        <Button
                          onClick={() => openRejectDialog(payout)}
                          disabled={isProcessing}
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
      </div>

      {/* Complete Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Payout</DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-2">
                <div>
                  Complete payout of{" "}
                  <strong className="text-primary">
                    ${selectedPayout?.amount.toFixed(2)}
                  </strong>{" "}
                  to <strong>{selectedPayout?.userName}</strong>?
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="transactionHash">
                Transaction Hash <span className="text-red-500">*</span>
              </Label>
              <Input
                id="transactionHash"
                placeholder="Enter transaction hash..."
                value={transactionHash}
                onChange={(e) => setTransactionHash(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleComplete}>Confirm & Complete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Payout</DialogTitle>
            <DialogDescription asChild>
              <div className="text-red-600">
                Reject payout request from{" "}
                <strong>{selectedPayout?.userName}</strong>? The amount will be
                refunded to their balance.
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rejectionReason">
                Rejection Reason (Optional)
              </Label>
              <Textarea
                id="rejectionReason"
                placeholder="Enter reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRejectDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject}>
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
