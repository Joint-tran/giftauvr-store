"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateProfile } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  MapPin,
  Wallet,
  Shield,
  DollarSign,
  Loader2,
  Save,
  Globe,
} from "lucide-react";

interface ProfileFormProps {
  user: {
    id: string;
    fullName: string;
    email: string;
    country: string;
    accountType: string;
    network: string;
    usdtWallet: string;
    approvalStatus: string;
    balance: number;
    createdAt: Date;
  };
}

const COUNTRIES = [
  "United States",
  "Vietnam",
  "China",
  "Japan",
  "South Korea",
  "Singapore",
  "Thailand",
  "Malaysia",
  "Indonesia",
  "Philippines",
  "India",
  "United Kingdom",
  "Germany",
  "France",
  "Canada",
  "Australia",
  "Other",
];

const NETWORKS = ["TRC20", "ERC20", "BEP20"];

const maskWalletAddress = (address: string) => {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user.fullName,
    country: user.country,
    network: user.network,
    usdtWallet: user.usdtWallet,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.country) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    const result = await updateProfile({
      fullName: formData.fullName,
      country: formData.country,
      network: formData.network || undefined,
      usdtWallet: formData.usdtWallet || undefined,
    });

    if (result.success) {
      alert("Profile updated successfully");
      setEditMode(false);
      router.refresh();
    } else {
      alert(result.error || "Failed to update profile");
    }
    setLoading(false);
  };

  const handleCancel = () => {
    setFormData({
      fullName: user.fullName,
      country: user.country,
      network: user.network,
      usdtWallet: user.usdtWallet,
    });
    setEditMode(false);
  };

  const getApprovalBadge = () => {
    switch (user.approvalStatus) {
      case "approved":
        return <Badge className="bg-green-600">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Account Information - Read Only */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Account Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              Email
            </Label>
            <div className="font-semibold">{user.email}</div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              Account Type
            </Label>
            <Badge variant="outline" className="text-sm">
              {user.accountType.toUpperCase()}
            </Badge>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground">
              <Shield className="h-4 w-4" />
              Approval Status
            </Label>
            <div>{getApprovalBadge()}</div>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              Current Balance
            </Label>
            <div className="text-2xl font-bold text-primary">
              ${user.balance.toFixed(2)}
            </div>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div>
              Member since: {new Date(user.createdAt).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editable Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </span>
            {!editMode && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditMode(true)}
              >
                Edit
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name <span className="text-red-500">*</span>
              </Label>
              {editMode ? (
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                  required
                />
              ) : (
                <div className="font-semibold">
                  {user.fullName || "Not set"}
                </div>
              )}
            </div>

            {/* Country */}
            <div className="space-y-2">
              <Label htmlFor="country" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Country <span className="text-red-500">*</span>
              </Label>
              {editMode ? (
                <Select
                  value={formData.country}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, country: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select country..." />
                  </SelectTrigger>
                  <SelectContent>
                    {COUNTRIES.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="font-semibold">{user.country || "Not set"}</div>
              )}
            </div>

            {/* Withdrawal Network */}
            <div className="space-y-2">
              <Label htmlFor="network" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Withdrawal Network
              </Label>
              {editMode && !user.network ? (
                <Select
                  value={formData.network}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, network: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select network..." />
                  </SelectTrigger>
                  <SelectContent>
                    {NETWORKS.map((network) => (
                      <SelectItem key={network} value={network}>
                        {network}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="text-sm">{user.network || "Not set"}</div>
              )}
              {user.network && (
                <p className="text-xs text-yellow-600 dark:text-yellow-500">
                  ⚠️ Network cannot be changed once set for security reasons
                </p>
              )}
            </div>

            {/* USDT Wallet */}
            <div className="space-y-2">
              <Label htmlFor="usdtWallet" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                USDT Wallet Address
              </Label>
              {editMode && !user.usdtWallet ? (
                <Input
                  id="usdtWallet"
                  type="text"
                  placeholder="Enter wallet address..."
                  value={formData.usdtWallet}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      usdtWallet: e.target.value,
                    }))
                  }
                />
              ) : (
                <div className="font-mono text-sm">
                  {user.usdtWallet
                    ? maskWalletAddress(user.usdtWallet)
                    : "Not set"}
                </div>
              )}
              {user.usdtWallet && (
                <p className="text-xs text-yellow-600 dark:text-yellow-500">
                  ⚠️ Wallet address cannot be changed once set for security
                  reasons
                </p>
              )}
              {!user.usdtWallet && !editMode && (
                <p className="text-xs text-muted-foreground">
                  Click Edit to set your wallet address (can only be set once)
                </p>
              )}
            </div>

            {editMode && (
              <div className="flex gap-2 pt-2">
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={loading}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
