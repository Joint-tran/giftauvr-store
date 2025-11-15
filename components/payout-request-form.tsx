"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitPayoutRequest } from "@/lib/actions/payout.actions";
import { useRouter } from "next/navigation";
import {
  DollarSign,
  Loader2,
  Send,
  Wallet,
  AlertCircle,
  Globe,
} from "lucide-react";

interface PayoutRequestFormProps {
  user: {
    id: string;
    fullName: string;
    email: string;
    balance: number;
    usdtWallet: string;
    network: string;
  };
}

const maskWalletAddress = (address: string) => {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function PayoutRequestForm({ user }: PayoutRequestFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payoutAmount = parseFloat(amount);

    if (!payoutAmount || payoutAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    if (payoutAmount > user.balance) {
      alert("Insufficient balance");
      return;
    }

    if (!user.usdtWallet || !user.network) {
      alert(
        "Please set your USDT wallet address and network in your profile first"
      );
      return;
    }

    setLoading(true);
    const result = await submitPayoutRequest({
      amount: payoutAmount,
      notes: notes || undefined,
    });

    if (result.success) {
      alert(result.message);
      setAmount("");
      setNotes("");
      router.refresh();
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send className="h-5 w-5" />
          Request Payout
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Current Balance */}
        <div className="mb-6 p-4 bg-primary/10 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Available Balance
            </span>
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold text-primary">
                {user.balance.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Wallet Info */}
        {user.usdtWallet && user.network ? (
          <div className="mb-6 p-4 bg-muted rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Wallet className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Payout to:</span>
            </div>
            <div className="font-mono text-sm font-semibold">
              {maskWalletAddress(user.usdtWallet)}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Network:</span>
              <span className="font-semibold">{user.network}</span>
            </div>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-700 dark:text-yellow-400">
                Please set your USDT wallet address and network in your profile
                before requesting a payout.
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">
              Amount (USD) <span className="text-red-500">*</span>
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="1"
              max={user.balance}
              placeholder="Enter amount..."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              disabled={!user.usdtWallet || !user.network}
            />
            <p className="text-xs text-muted-foreground">
              Maximum: ${user.balance.toFixed(2)}
            </p>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional information..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              disabled={!user.usdtWallet || !user.network}
            />
          </div>

          <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <p className="text-sm text-blue-700 dark:text-blue-400">
              ℹ️ Your payout request will be reviewed by our team. Processing
              time is typically 24-48 hours.
            </p>
          </div>

          <Button
            type="submit"
            disabled={loading || !user.usdtWallet || !user.network}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Payout Request
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
