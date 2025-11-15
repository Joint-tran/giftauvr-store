"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Wallet,
  Copy,
  CheckCircle,
  Clock,
  DollarSign,
  Shield,
} from "lucide-react";
import { useState } from "react";

interface DepositPaywallProps {
  user: {
    id: string;
    fullName: string;
    email: string;
    balance: number;
    approvalStatus: string;
  };
}

// Admin wallet addresses for deposits
const ADMIN_WALLETS = {
  TRC20: "TMHe6Z7ypvYb25GALarBmEtv77K16CNUsZ",
  ERC20: "0xCBD474Ee4feDD28Ab715141CA4E2C2621b85827a",
};

export function DepositPaywall({ user }: DepositPaywallProps) {
  const [copiedNetwork, setCopiedNetwork] = useState<string | null>(null);

  const copyToClipboard = (text: string, network: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNetwork(network);
    setTimeout(() => setCopiedNetwork(null), 2000);
  };

  return (
    <div className="grid gap-6 max-w-4xl mx-auto">
      {/* Account Status Alert */}
      <Alert className="border-yellow-500/50 bg-yellow-500/10">
        <AlertCircle className="h-5 w-5 text-yellow-600" />
        <AlertDescription className="ml-2">
          <div className="space-y-2">
            <p className="font-semibold text-yellow-700 dark:text-yellow-500">
              Account Activation Required
            </p>
            <p className="text-sm text-muted-foreground">
              Your account is currently{" "}
              <Badge variant="secondary">Pending Approval</Badge>. To activate
              withdrawals and start trading, please complete the deposit
              requirement below.
            </p>
          </div>
        </AlertDescription>
      </Alert>

      {/* Deposit Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Deposit Requirement
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Balance */}
          <div className="p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                Current Balance
              </span>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold text-primary">
                  ${user.balance.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-6 bg-primary/10 border-2 border-primary/20 rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Required Deposit Amount
              </p>
              <p className="text-4xl font-bold text-primary">$300 USDT</p>
            </div>

            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription className="ml-2">
                <p className="text-sm">
                  This deposit is added to your balance and can be used for
                  trading or withdrawn after account approval. It serves as a
                  security measure to prevent fraud.
                </p>
              </AlertDescription>
            </Alert>
          </div>

          {/* Wallet Addresses */}
          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Deposit to Admin Wallet
            </h3>
            <p className="text-sm text-muted-foreground">
              Choose your preferred network and send exactly{" "}
              <strong>$300 USDT</strong> to the corresponding address:
            </p>

            <div className="space-y-3">
              {Object.entries(ADMIN_WALLETS).map(([network, address]) => (
                <div
                  key={network}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <Badge variant="outline" className="text-xs">
                        {network}
                      </Badge>
                      <div className="font-mono text-xs break-all bg-muted p-2 rounded">
                        {address}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(address, network)}
                      className="shrink-0"
                    >
                      {copiedNetwork === network ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Notes */}
          <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg space-y-2">
            <p className="font-semibold text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Important Instructions
            </p>
            <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1 ml-6 list-disc">
              <li>
                Send exactly <strong>$300 USDT</strong> to avoid delays
              </li>
              <li>Use the correct network matching the wallet address</li>
              <li>
                After sending, wait for admin review (typically 24-48 hours)
              </li>
              <li>You will receive an email notification when approved</li>
              <li>Once approved, the $300 will be added to your balance</li>
            </ul>
          </div>

          {/* What Happens Next */}
          <div className="p-4 border rounded-lg space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Clock className="h-4 w-4" />
              What Happens Next?
            </h4>
            <ol className="text-sm text-muted-foreground space-y-2 ml-6 list-decimal">
              <li>Send $300 USDT to one of the admin wallet addresses above</li>
              <li>Admin will verify your transaction on the blockchain</li>
              <li>Your account will be approved within 24-48 hours</li>
              <li>$300 USDT will be added to your account balance</li>
              <li>You can start trading and requesting payouts</li>
            </ol>
          </div>

          {/* Support */}
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Having issues? Contact admin support for assistance.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Disabled Payout Notice */}
      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-destructive">
                Payout Requests Currently Disabled
              </p>
              <p className="text-sm text-muted-foreground">
                You must complete the deposit requirement and have your account
                approved before you can request payouts. This security measure
                protects both buyers and sellers.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
