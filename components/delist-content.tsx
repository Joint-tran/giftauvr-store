"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { delistAllMyEgifts } from "@/lib/actions/egift.actions";
import { useRouter } from "next/navigation";
import {
  PackageX,
  Loader2,
  AlertTriangle,
  CheckCircle2,
  Package,
} from "lucide-react";

interface DelistContentProps {
  pendingCount: number;
}

export function DelistContent({ pendingCount }: DelistContentProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [delistedCount, setDelistedCount] = useState(0);

  const handleDelist = async () => {
    setLoading(true);
    const result = await delistAllMyEgifts();

    if (result.success) {
      setDone(true);
      setDelistedCount(result.count || 0);
      router.refresh();
    } else {
      alert(result.error || "Failed to delist gift cards");
    }
    setLoading(false);
  };

  if (done) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center py-8 space-y-4">
            <div className="rounded-full bg-green-500/10 p-4">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold">Delist Complete</h2>
            <p className="text-muted-foreground">
              {delistedCount} gift card(s) have been delisted successfully.
            </p>
            <Button variant="outline" onClick={() => router.push("/sell")}>
              Back to Sell
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (pendingCount === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center py-8 space-y-4">
            <div className="rounded-full bg-muted p-4">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold">No Pending Gift Cards</h2>
            <p className="text-muted-foreground">
              You don&apos;t have any pending gift cards to delist.
            </p>
            <Button variant="outline" onClick={() => router.push("/sell")}>
              Back to Sell
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PackageX className="h-5 w-5" />
          Delist All Pending Gift Cards
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="font-semibold text-amber-700 dark:text-amber-400">
                You have {pendingCount} pending gift card(s)
              </p>
              <p className="text-sm text-muted-foreground">
                This action will delist all your pending gift cards from the marketplace.
                Delisted cards will no longer be reviewed or sold. This action cannot be undone.
              </p>
            </div>
          </div>
        </div>

        <Button
          onClick={handleDelist}
          disabled={loading}
          variant="destructive"
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Delisting...
            </>
          ) : (
            <>
              <PackageX className="mr-2 h-4 w-4" />
              Delist All {pendingCount} Gift Card(s)
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
