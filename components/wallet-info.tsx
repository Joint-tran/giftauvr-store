"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Wallet,
  DollarSign,
  Hash,
  Globe,
  Network,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { useLocale } from "@/hooks/use-locale";

interface WalletInfoProps {
  user: {
    fullName: string;
    email: string;
    accountType: string;
    country?: string;
    network?: string;
    usdtWallet?: string;
    balance: number;
    depositAmount: number;
    depositTransactionHash?: string;
    approvalStatus?: string;
  };
}

export function WalletInfo({ user }: WalletInfoProps) {
  const { t } = useLocale();

  // Function to mask wallet address (show first 4 and last 4 characters)
  const maskWalletAddress = (address?: string) => {
    if (!address) return t.notAvailable;
    if (address.length <= 8) return address;
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const getStatusConfig = (status?: string) => {
    switch (status) {
      case "approved":
        return {
          label: t.approved,
          variant: "default" as const,
          icon: CheckCircle,
          color: "text-green-600",
        };
      case "rejected":
        return {
          label: t.rejected,
          variant: "destructive" as const,
          icon: XCircle,
          color: "text-red-600",
        };
      default:
        return {
          label: t.pending,
          variant: "secondary" as const,
          icon: Clock,
          color: "text-yellow-600",
        };
    }
  };

  const statusConfig = getStatusConfig(user.approvalStatus);
  const StatusIcon = statusConfig.icon;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Balance Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            {t.accountBalance}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-4xl font-bold text-primary">
            ${user.balance.toFixed(2)}
          </div>
          <div className="flex items-center gap-2">
            <StatusIcon className={`h-4 w-4 ${statusConfig.color}`} />
            <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Deposit Info Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            {t.depositInfo}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">{t.amountDeposited}:</span>
            <span className="font-semibold text-lg">
              ${user.depositAmount.toFixed(2)} USDT
            </span>
          </div>
          {user.depositTransactionHash && (
            <div className="space-y-1">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Hash className="h-3 w-3" />
                {t.transactionHash}:
              </span>
              <code className="text-xs bg-muted p-2 rounded block break-all">
                {user.depositTransactionHash}
              </code>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Wallet Details Card */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            {t.walletDetails}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wallet className="h-4 w-4" />
                {t.walletAddress}
              </div>
              <div className="font-mono text-sm bg-muted p-3 rounded-lg">
                {maskWalletAddress(user.usdtWallet)}
              </div>
              {user.usdtWallet && (
                <p className="text-xs text-muted-foreground">
                  {t.securityNote}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Network className="h-4 w-4" />
                {t.network}
              </div>
              <div className="font-medium p-3 bg-muted rounded-lg">
                {user.network || t.notAvailable}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="h-4 w-4" />
                {t.country}
              </div>
              <div className="font-medium p-3 bg-muted rounded-lg">
                {user.country || t.notAvailable}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Wallet className="h-4 w-4" />
                {t.accountType}
              </div>
              <div className="font-medium p-3 bg-muted rounded-lg">
                {user.accountType}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
