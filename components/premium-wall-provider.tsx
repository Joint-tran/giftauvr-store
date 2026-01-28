"use client";

import { PremiumWall } from "./premium-wall";

interface PremiumWallProviderProps {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

export function PremiumWallProvider({ children, user }: PremiumWallProviderProps) {
  // Check if user is a premium account that hasn't been activated yet
  const isPremium = user?.accountType === "premium";
  const isActivated = !!user?.premiumActivatedAt;
  const needsDeposit = isPremium && !isActivated;

  if (needsDeposit) {
    return (
      <PremiumWall
        depositRequired={user.premiumDepositRequired || 15000}
        depositAmount={user.premiumDepositAmount || 0}
        walletAddress={user.premiumWalletAddress}
      />
    );
  }

  return <>{children}</>;
}
