"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Ban, ShieldCheck } from "lucide-react";
import { banUser, unbanUser } from "@/lib/actions/admin.actions";
import { toast } from "sonner";

interface UserBanManagementProps {
  userId: string;
  isBanned?: boolean;
  userName: string;
}

export function UserBanManagement({
  userId,
  isBanned = false,
  userName,
}: UserBanManagementProps) {
  const [open, setOpen] = useState(false);
  const [banReason, setBanReason] = useState("");
  const [banContactEmail, setBanContactEmail] = useState(
    "support@giftauvr.com"
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleBanUser = async () => {
    if (!banReason.trim()) {
      toast.error("Please enter a ban reason");
      return;
    }

    setIsLoading(true);
    try {
      const result = await banUser(userId, banReason, banContactEmail);
      if (result.success) {
        toast.success(result.message);
        setOpen(false);
        setBanReason("");
        window.location.reload();
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("An error occurred while banning the account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnbanUser = async () => {
    setIsLoading(true);
    try {
      const result = await unbanUser(userId);
      if (result.success) {
        toast.success(result.message);
        setOpen(false);
        window.location.reload();
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("An error occurred while unbanning the account");
    } finally {
      setIsLoading(false);
    }
  };

  if (isBanned) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <ShieldCheck className="mr-2 h-4 w-4" />
            Unban
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unban Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to unban {userName}&apos;s account?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUnbanUser} disabled={isLoading}>
              {isLoading ? "Processing..." : "Confirm"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Ban className="mr-2 h-4 w-4" />
          Ban Account
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ban Account</DialogTitle>
          <DialogDescription>
            Enter information to ban {userName}&apos;s account
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="banReason">Ban Reason *</Label>
            <Textarea
              id="banReason"
              placeholder="e.g., Terms of service violation, fraud..."
              value={banReason}
              onChange={(e) => setBanReason(e.target.value)}
              rows={4}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="banContactEmail">Contact Email</Label>
            <Input
              id="banContactEmail"
              type="email"
              placeholder="support@giftauvr.com"
              value={banContactEmail}
              onChange={(e) => setBanContactEmail(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Email for users to contact when they need support
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleBanUser}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Ban Account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
