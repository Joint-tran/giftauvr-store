"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Progress } from "./ui/progress";
import {
  Crown,
  MoreHorizontal,
  Wallet,
  DollarSign,
  ArrowDownCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  upgradeUserToPremium,
  setPremiumWalletAddress,
  updatePremiumDeposit,
  downgradeFromPremium,
} from "@/lib/actions/premium.actions";
import { toast } from "sonner";

interface UserPremiumManagementProps {
  userEmail: string;
  userName: string;
  accountType: string;
  premiumDepositRequired?: number;
  premiumDepositAmount?: number;
  premiumWalletAddress?: string;
  premiumActivatedAt?: Date;
}

export function UserPremiumManagement({
  userEmail,
  userName,
  accountType,
  premiumDepositRequired = 15000,
  premiumDepositAmount = 0,
  premiumWalletAddress,
  premiumActivatedAt,
}: UserPremiumManagementProps) {
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [depositOpen, setDepositOpen] = useState(false);
  const [walletAddress, setWalletAddress] = useState(premiumWalletAddress || "");
  const [depositAmount, setDepositAmount] = useState(premiumDepositAmount.toString());
  const [isLoading, setIsLoading] = useState(false);

  const isPremium = accountType === "premium";
  const isActivated = !!premiumActivatedAt;
  const depositProgress = (premiumDepositAmount / premiumDepositRequired) * 100;

  const handleUpgrade = async () => {
    setIsLoading(true);
    try {
      const result = await upgradeUserToPremium(userEmail);
      if (result.success) {
        toast.success(result.message);
        setUpgradeOpen(false);
        window.location.reload();
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetWallet = async () => {
    if (!walletAddress.trim()) {
      toast.error("Please enter wallet address");
      return;
    }

    setIsLoading(true);
    try {
      const result = await setPremiumWalletAddress({
        userEmail,
        walletAddress: walletAddress.trim(),
      });
      if (result.success) {
        toast.success(result.message);
        setWalletOpen(false);
        window.location.reload();
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateDeposit = async () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount < 0) {
      toast.error("Invalid amount");
      return;
    }

    setIsLoading(true);
    try {
      const result = await updatePremiumDeposit({
        userEmail,
        amount,
      });
      if (result.success) {
        toast.success(result.message);
        setDepositOpen(false);
        window.location.reload();
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDowngrade = async () => {
    if (!confirm("Are you sure you want to downgrade this account?")) return;

    setIsLoading(true);
    try {
      const result = await downgradeFromPremium(userEmail);
      if (result.success) {
        toast.success(result.message);
        window.location.reload();
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const getPremiumBadge = () => {
    if (!isPremium) {
      return null;
    }

    if (isActivated) {
      return (
        <Badge className="gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
          <Crown className="h-3 w-3" />
          Premium
        </Badge>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <Badge className="gap-1 bg-gradient-to-r from-amber-500/50 to-orange-500/50 text-amber-700 border-amber-500/30">
          <Clock className="h-3 w-3" />
          Premium (Pending)
        </Badge>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span>${premiumDepositAmount.toLocaleString()}</span>
          <span>/</span>
          <span>${premiumDepositRequired.toLocaleString()}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex items-center gap-2">
      {getPremiumBadge()}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {!isPremium && (
            <DropdownMenuItem onSelect={() => setUpgradeOpen(true)}>
              <Crown className="mr-2 h-4 w-4 text-amber-500" />
              Upgrade to Premium
            </DropdownMenuItem>
          )}

          {isPremium && !isActivated && (
            <>
              <DropdownMenuItem onSelect={() => setWalletOpen(true)}>
                <Wallet className="mr-2 h-4 w-4" />
                Update Wallet Address
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setDepositOpen(true)}>
                <DollarSign className="mr-2 h-4 w-4 text-green-500" />
                Update Deposit Amount
              </DropdownMenuItem>
            </>
          )}

          {isPremium && (
            <DropdownMenuItem onSelect={handleDowngrade} className="text-red-600">
              <ArrowDownCircle className="mr-2 h-4 w-4" />
              Downgrade Account
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Upgrade to Premium Dialog */}
      <Dialog open={upgradeOpen} onOpenChange={setUpgradeOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-amber-500" />
              Upgrade to Premium
            </DialogTitle>
            <DialogDescription>
              Upgrade {userName}&apos;s account to Premium
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Premium account requires <strong>$15,000</strong> deposit to activate.
              After upgrade, you need to set the wallet address for the user.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setUpgradeOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleUpgrade}
              disabled={isLoading}
              className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
            >
              {isLoading ? "Processing..." : "Upgrade to Premium"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Set Wallet Address Dialog */}
      <Dialog open={walletOpen} onOpenChange={setWalletOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Wallet Address</DialogTitle>
            <DialogDescription>
              Wallet address for {userName} to deposit Premium funds
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="walletAddress">USDT Wallet Address</Label>
              <Input
                id="walletAddress"
                placeholder="0x..."
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWalletOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSetWallet} disabled={isLoading}>
              {isLoading ? "Processing..." : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Deposit Dialog */}
      <Dialog open={depositOpen} onOpenChange={setDepositOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Deposit Amount</DialogTitle>
            <DialogDescription>
              Update the amount {userName} has deposited for Premium
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Current Progress</Label>
              <div className="space-y-2">
                <Progress value={depositProgress} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>${premiumDepositAmount.toLocaleString()}</span>
                  <span>${premiumDepositRequired.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="depositAmount">Amount Deposited ($)</Label>
              <Input
                id="depositAmount"
                type="number"
                placeholder="0"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDepositOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateDeposit} disabled={isLoading}>
              {isLoading ? "Processing..." : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
