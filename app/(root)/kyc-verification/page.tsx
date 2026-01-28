import { auth } from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { KycVerificationForm } from "@/components/kyc-verification-form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Clock, XCircle, CheckCircle2 } from "lucide-react";
import { submitKycVerification } from "@/lib/actions/kyc.actions";
import { connectToDatabase } from "@/database/mongoose";

export default async function KycVerificationPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  
  if (!session?.user) {
    redirect("/sign-in");
  }

  // Fetch user data from database to get KYC fields
  const mongoose = await connectToDatabase();
  const db = mongoose.connection.db;
  let dbUser = null;
  if (db) {
    dbUser = await db.collection("user").findOne({ id: session.user.id });
    if (!dbUser) {
      dbUser = await db.collection("user").findOne({ email: session.user.email });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = {
    id: session.user.id,
    kycRequired: dbUser?.kycRequired ?? false,
    kycStatus: dbUser?.kycStatus,
    kycReason: dbUser?.kycReason,
    kycDocumentType: dbUser?.kycDocumentType,
    kycDocumentFront: dbUser?.kycDocumentFront,
    kycDocumentBack: dbUser?.kycDocumentBack,
    kycSelfie: dbUser?.kycSelfie,
  };

  // If KYC is not required or already approved, redirect to home
  if (!user.kycRequired || user.kycStatus === "approved") {
    redirect("/");
  }

  const handleSubmit = async (data: {
    documentType: string;
    documentFront: string;
    documentBack: string;
    selfie: string;
  }) => {
    "use server";
    await submitKycVerification({
      userId: user.id,
      documentType: data.documentType,
      documentFront: data.documentFront,
      documentBack: data.documentBack,
      selfie: data.selfie,
    });
  };

  const getStatusBadge = () => {
    switch (user.kycStatus) {
      case "submitted":
        return (
          <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
            <Clock className="mr-1 h-3 w-3" />
            Under Review
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="mr-1 h-3 w-3" />
            Rejected
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Verified
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            <ShieldCheck className="mr-1 h-3 w-3" />
            Pending Verification
          </Badge>
        );
    }
  };

  return (
    <div className="container max-w-4xl py-8">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="rounded-full bg-orange-500/10 p-4">
            <ShieldCheck className="h-12 w-12 text-orange-500" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-2">Identity Verification</h1>
        <p className="text-muted-foreground mb-4">
          Complete the verification process to continue using our services
        </p>
        <div className="flex justify-center">
          {getStatusBadge()}
        </div>
      </div>

      {user.kycReason && (
        <Card className="mb-6 border-orange-500/20 bg-orange-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-orange-600">Verification Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{user.kycReason}</p>
          </CardContent>
        </Card>
      )}

      {user.kycStatus === "submitted" ? (
        <Card>
          <CardHeader>
            <CardTitle>Documents Under Review</CardTitle>
            <CardDescription>
              Your identity verification documents have been submitted and are currently being reviewed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-700 dark:text-yellow-500">Review in Progress</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    This process usually takes 1-3 business days. We&apos;ll notify you once the review is complete.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <KycVerificationForm
          onSubmit={handleSubmit}
          existingData={{
            documentType: user.kycDocumentType || "",
            documentFront: user.kycDocumentFront || "",
            documentBack: user.kycDocumentBack || "",
            selfie: user.kycSelfie || "",
          }}
        />
      )}
    </div>
  );
}
