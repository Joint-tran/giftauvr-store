"use client";

import { KycWall } from "./kyc-wall";
import { usePathname } from "next/navigation";

interface KycWallProviderProps {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

export function KycWallProvider({ children, user }: KycWallProviderProps) {
  const pathname = usePathname();

  // Check if on kyc-verification page (use startsWith for safety)
  const isKycPage = pathname?.startsWith("/kyc-verification");

  // Show KYC wall if user needs KYC and is NOT on the verification page
  const shouldShowKycWall = user && user.kycRequired === true && user.kycStatus !== "approved" && !isKycPage;

  if (shouldShowKycWall) {
    return <KycWall kycStatus={user.kycStatus} kycReason={user.kycReason} />;
  }

  return <>{children}</>;
}
