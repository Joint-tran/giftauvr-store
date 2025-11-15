"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createWithdrawal } from "@/lib/actions/withdrawal.actions";
import { useRouter } from "next/navigation";
import { DollarSign, Loader2, ArrowDownToLine } from "lucide-react";

interface WithdrawalFormProps {
  user: {
    balance: number;
    usdtWallet?: string;
    network?: string;
  };
}

export function WithdrawalForm({ user }: WithdrawalFormProps) {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to mask wallet address (show first 4 and last 4 characters)
  const maskWalletAddress = (address?: string) => {
    if (!address) return "Not set";
    if (address.length <= 8) return address;
    return `${address.slice(0, 4)}....${address.slice(-4)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const withdrawalAmount = parseFloat(amount);

    if (!amount) {
      alert("Please enter amount");
      return;
    }

    if (withdrawalAmount < 10) {
      alert("Minimum withdrawal amount is $10 USDT");
      return;
    }

    if (withdrawalAmount > user.balance) {
      alert("Insufficient balance");
      return;
    }

    setLoading(true);
    const result = await createWithdrawal(withdrawalAmount);

    if (result.success) {
      alert(result.message);
      setAmount("");
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
          <ArrowDownToLine className="h-5 w-5" />
          Withdrawal Request
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Available Balance:
              </span>
              <span className="text-2xl font-bold text-primary">
                ${user.balance.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Withdrawal Amount (USDT)
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="10"
              max={user.balance}
              placeholder="Enter amount (min $10)..."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              Minimum: $10 USDT | Maximum: ${user.balance.toFixed(2)} USDT
            </p>
          </div>

          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg space-y-2">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-300">
              ℹ️ Withdrawal Information:
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-400">
              Your withdrawal will be processed to the wallet address:{" "}
              <span className="font-mono font-bold">
                {maskWalletAddress(user.usdtWallet)}
              </span>
              {user.network && (
                <>
                  {" "}
                  with <span className="font-bold">{user.network}</span>
                </>
              )}
            </p>
            {!user.usdtWallet && (
              <p className="text-xs text-red-600 dark:text-red-400">
                ⚠️ Please update your wallet address in your profile before
                making a withdrawal.
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loading || user.balance < 10}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <ArrowDownToLine className="mr-2 h-4 w-4" />
                Request Withdrawal
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
