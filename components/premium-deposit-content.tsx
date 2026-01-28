"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Crown, Wallet, Copy, CheckCircle2, ExternalLink, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface PremiumDepositContentProps {
  depositRequired: number;
  depositAmount: number;
  walletAddress: string;
}

export function PremiumDepositContent({
  depositRequired,
  depositAmount,
  walletAddress,
}: PremiumDepositContentProps) {
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
    <div className="container max-w-2xl py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-white mb-4">
          <Crown className="h-6 w-6" />
          <span className="text-xl font-bold">Premium Account</span>
        </div>
        <p className="text-muted-foreground">
          Complete your deposit to activate Premium features
        </p>
      </div>

      {/* Progress Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-500" />
            Deposit Progress
          </CardTitle>
          <CardDescription>
            Track your deposit progress towards Premium activation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Progress</span>
              <span className="text-muted-foreground">{progress.toFixed(1)}%</span>
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
          <div className="rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200 dark:border-amber-800 p-4">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              Remaining to deposit:
            </p>
            <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">
              ${remaining.toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Wallet Address Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Deposit Wallet
          </CardTitle>
          <CardDescription>
            Send USDT to this  <strong>USDT ERC20</strong> wallet address. Be careful with the network selection.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {walletAddress ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 rounded-lg bg-muted p-4">
                <code className="flex-1 font-mono text-sm break-all">
                  {walletAddress}
                </code>
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
              <Button onClick={handleCopy} className="w-full" variant="outline">
                <Copy className="mr-2 h-4 w-4" />
                Copy Wallet Address
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 p-4">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                Wallet address will be provided by admin. Please wait or contact support.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>How to Deposit</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                1
              </span>
              <div>
                <p className="font-medium">Copy the wallet address</p>
                <p className="text-sm text-muted-foreground">
                  Use the copy button above to copy the USDT wallet address
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                2
              </span>
              <div>
                <p className="font-medium">Transfer USDT</p>
                <p className="text-sm text-muted-foreground">
                  Send USDT to the wallet address from your crypto wallet or exchange
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                3
              </span>
              <div>
                <p className="font-medium">Contact admin to confirm</p>
                <p className="text-sm text-muted-foreground">
                  After the transfer is complete, contact admin with your transaction hash
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
                4
              </span>
              <div>
                <p className="font-medium">Premium activation</p>
                <p className="text-sm text-muted-foreground">
                  Once confirmed, your Premium account will be activated
                </p>
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Need help with your deposit? Contact our support team.
            </p>
            <Button variant="outline" asChild>
              <a href="mailto:support@giftauvr.com">
                <ExternalLink className="mr-2 h-4 w-4" />
                Contact Support
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
