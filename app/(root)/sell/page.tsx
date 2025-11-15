import { auth } from "@/lib/better-auth/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { SellEgiftForm } from "@/components/sell-egift-form";
import { MyEgiftsList } from "@/components/my-egifts-list";
import { getMyEgifts } from "@/lib/actions/egift.actions";

export default async function SellPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  // Check if user is a seller
  if (session.user.accountType?.toLowerCase() !== "seller") {
    redirect("/");
  }

  const egiftsResult = await getMyEgifts();
  const myEgifts = egiftsResult.success ? egiftsResult.data : [];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Sell Gift Cards</h1>
        <p className="text-muted-foreground mt-2">
          List your gift cards for sale
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SellEgiftForm />
        <MyEgiftsList egifts={myEgifts} />
      </div>
    </div>
  );
}
