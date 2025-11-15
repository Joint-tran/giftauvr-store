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
import { updateUserWallet } from "@/lib/actions/admin.actions";
import { useRouter } from "next/navigation";
import { Wallet, Hash, DollarSign, Loader2, CheckCircle } from "lucide-react";

interface WalletUpdateFormProps {
  users: any[];
}

export function WalletUpdateForm({ users }: WalletUpdateFormProps) {
  const router = useRouter();
  const [selectedUserId, setSelectedUserId] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedUserId || !depositAmount || !transactionHash) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setLoading(true);
    const result = await updateUserWallet(
      selectedUserId,
      parseFloat(depositAmount),
      transactionHash
    );

    if (result.success) {
      alert(result.message);
      setSelectedUserId("");
      setDepositAmount("");
      setTransactionHash("");
      router.refresh();
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  const selectedUser = users.find((u) => {
    const userId = u.id || u._id?.toString();
    return userId === selectedUserId;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Cập nhật thông tin nạp tiền
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="user">Chọn User</Label>
            <Select value={selectedUserId} onValueChange={setSelectedUserId}>
              <SelectTrigger id="user">
                <SelectValue placeholder="Chọn user cần cập nhật..." />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => {
                  const userId = user.id || user._id?.toString();
                  return (
                    <SelectItem key={userId} value={userId}>
                      {user.fullName || user.name} ({user.email})
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {selectedUser && (
            <div className="p-4 bg-muted rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{selectedUser.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trạng thái:</span>
                <span className="font-medium">
                  {selectedUser.approvalStatus || "pending"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">USDT Wallet:</span>
                <span className="font-mono text-xs">
                  {selectedUser.usdtWallet || "Chưa có"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Số tiền hiện tại:</span>
                <span className="font-medium">
                  ${selectedUser.depositAmount || 0} USDT
                </span>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="amount" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Số tiền nạp (USDT)
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="Nhập số tiền USDT..."
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hash" className="flex items-center gap-2">
              <Hash className="h-4 w-4" />
              Transaction Hash
            </Label>
            <Input
              id="hash"
              type="text"
              placeholder="Nhập transaction hash..."
              value={transactionHash}
              onChange={(e) => setTransactionHash(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading || !selectedUserId}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang cập nhật...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Cập nhật thông tin
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
