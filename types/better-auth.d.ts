import "better-auth";

declare module "better-auth" {
  interface User {
    fullName: string;
    country?: string;
    accountType: string;
    network?: string;
    usdtWallet?: string;
    approvalStatus?: string;
    balance?: number;
    depositAmount?: number;
    depositTransactionHash?: string;
    isBanned?: boolean;
    banReason?: string;
    banContactEmail?: string;
    // KYC fields
    kycRequired?: boolean;
    kycStatus?: "pending" | "submitted" | "approved" | "rejected";
    kycReason?: string;
    kycDocumentType?: string;
    kycDocumentFront?: string;
    kycDocumentBack?: string;
    kycSelfie?: string;
    kycSubmittedAt?: Date;
    kycReviewedAt?: Date;
  }

  interface Session {
    user: User & {
      id: string;
      email: string;
      emailVerified: boolean;
      name: string;
      image?: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
  }
}
