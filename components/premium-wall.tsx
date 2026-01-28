"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Crown, Wallet, Copy, CheckCircle2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface PremiumWallProps {
  depositRequired: number;
  depositAmount: number;
  walletAddress?: string;
}

export function PremiumWall({
  depositRequired,
  depositAmount,
  walletAddress,
}: PremiumWallProps) {
  const [copied, setCopied] = useState(false);
  const progress = (depositAmount / depositRequired) * 100;
  const remaining = depositRequired - depositAmount;

  const handleCopy = async () => {
    if (!walletAddress) return;
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      toast.success("Wallet address copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-lg">
        <div className="relative overflow-hidden rounded-2xl border bg-card shadow-2xl">
          {/* Premium gradient header */}
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-6 text-white">
            <div className="flex items-center justify-center gap-3">
              <div className="rounded-full bg-white/20 p-3">
                <Crown className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Premium Account</h2>
                <p className="text-amber-100">Complete deposit to activate</p>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Progress section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Deposit Progress</span>
                <span className="text-sm text-muted-foreground">
                  {progress.toFixed(1)}%
                </span>
              </div>
              <Progress value={progress} className="h-4" />
              <div className="flex justify-between text-sm">
                <span className="font-semibold text-green-600">
                  ${depositAmount.toLocaleString()}
                </span>
                <span className="text-muted-foreground">
                  / ${depositRequired.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Remaining amount */}
            <div className="rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                Remaining to deposit:
              </p>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                ${remaining.toLocaleString()}
              </p>
            </div>

            {/* Wallet address */}
            {walletAddress ? (
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Wallet className="h-4 w-4" />
                  Deposit Wallet Address (USDT)
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-lg bg-muted p-3 font-mono text-sm break-all">
                    {walletAddress}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleCopy}
                    className="shrink-0"
                  >
                    {copied ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="rounded-lg bg-muted p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  Wallet address will be provided by admin
                </p>
              </div>
            )}

            {/* Instructions */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Instructions:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Copy the wallet address above</li>
                <li>Transfer USDT to this wallet address</li>
                <li>After transfer, contact admin to confirm</li>
                <li>Your Premium account will be activated after confirmation</li>
              </ol>
            </div>

            {/* Contact support */}
            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full" asChild>
                <a href="mailto:support@giftauvr.com">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Contact Support
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
