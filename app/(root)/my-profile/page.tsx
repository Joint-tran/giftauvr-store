import { auth } from "@/lib/better-auth/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { ProfileForm } from "@/components/profile-form";

export default async function MyProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const user = {
    id: session.user.id,
    fullName: (session.user as any).fullName || session.user.name || "",
    email: session.user.email,
    country: (session.user as any).country || "",
    accountType: (session.user as any).accountType || "",
    network: (session.user as any).network || "",
    usdtWallet: (session.user as any).usdtWallet || "",
    approvalStatus: (session.user as any).approvalStatus || "pending",
    balance: (session.user as any).balance || 0,
    createdAt: session.user.createdAt,
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal information
        </p>
      </div>

      <ProfileForm user={user} />
    </div>
  );
}
