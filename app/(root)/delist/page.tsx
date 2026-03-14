import { auth } from "@/lib/better-auth/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getMyPendingEgiftsCount } from "@/lib/actions/egift.actions";
import { DelistContent } from "@/components/delist-content";

export default async function DelistPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const accountType = (session.user as any).accountType?.toLowerCase();

  if (accountType !== "seller" && accountType !== "premium") {
    redirect("/");
  }

  const result = await getMyPendingEgiftsCount();
  const pendingCount = result.count || 0;

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Delist Gift Cards</h1>
        <p className="text-muted-foreground mt-2">
          Remove all your pending gift cards from the marketplace
        </p>
      </div>

      <DelistContent pendingCount={pendingCount} />
    </div>
  );
}
