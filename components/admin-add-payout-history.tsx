"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { adminAddPayoutHistory } from "@/lib/actions/payout.actions";
import { useRouter } from "next/navigation";
import {
  History,
  Loader2,
  CheckCircle2,
  DollarSign,
  Wallet,
  Globe,
  Calendar,
  User,
  Hash,
} from "lucide-react";

interface AdminAddPayoutHistoryProps {
  users: {
    _id: string;
    email: string;
    fullName?: string;
    name?: string;
    accountType?: string;
  }[];
}

const NETWORKS = ["TRC20", "ERC20", "BEP20"];

export function AdminAddPayoutHistory({ users }: AdminAddPayoutHistoryProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [selectedEmail, setSelectedEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [network, setNetwork] = useState("");
  const [date, setDate] = useState("");
  const [transactionHash, setTransactionHash] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!selectedEmail) return setError("Please select a user");
    if (!amount || Number(amount) <= 0) return setError("Please enter a valid amount");
    if (!walletAddress) return setError("Please enter a wallet address");
    if (!network) return setError("Please select a network");
    if (!date) return setError("Please select a date");

    setLoading(true);

    const result = await adminAddPayoutHistory({
      userEmail: selectedEmail,
      amount: Number(amount),
      walletAddress,
      network,
      date,
      transactionHash: transactionHash || undefined,
    });

    if (result.success) {
      setSuccess(result.message || "Payout history added successfully");
      setAmount("");
      setWalletAddress("");
      setNetwork("");
      setDate("");
      setTransactionHash("");
      setSelectedEmail("");
      router.refresh();
    } else {
      setError(result.error || "Failed to add payout history");
    }

    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="h-5 w-5" />
          Add Payout History
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* User Selector */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Select User
          </Label>
          <Select value={selectedEmail} onValueChange={setSelectedEmail}>
            <SelectTrigger>
              <SelectValue placeholder="Choose a user..." />
            </SelectTrigger>
            <SelectContent>
              {users.map((u) => (
                <SelectItem key={u._id} value={u.email}>
                  {u.fullName || u.name || u.email} ({u.email})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Amount (USD)
          </Label>
          <Input
            type="number"
            placeholder="e.g. 5000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min={0}
            step="0.01"
          />
        </div>

        {/* Wallet Address */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Wallet Address
          </Label>
          <Input
            type="text"
            placeholder="e.g. TXyz...abc"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
          />
        </div>

        {/* Network */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Network
          </Label>
          <Select value={network} onValueChange={setNetwork}>
            <SelectTrigger>
              <SelectValue placeholder="Select network..." />
            </SelectTrigger>
            <SelectContent>
              {NETWORKS.map((n) => (
                <SelectItem key={n} value={n}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date & Time
          </Label>
          <Input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Transaction Hash (optional) */}
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Hash className="h-4 w-4" />
            Transaction Hash (optional)
          </Label>
          <Input
            type="text"
            placeholder="e.g. 0xabc123..."
            value={transactionHash}
            onChange={(e) => setTransactionHash(e.target.value)}
          />
        </div>

        {/* Feedback */}
        {error && (
          <div className="text-sm text-red-600 bg-red-50 dark:bg-red-950 p-3 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="text-sm text-green-600 bg-green-50 dark:bg-green-950 p-3 rounded-lg flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            {success}
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <History className="mr-2 h-4 w-4" />
              Add Payout History
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
