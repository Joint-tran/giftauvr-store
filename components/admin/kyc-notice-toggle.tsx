"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ShieldAlert, Loader2 } from "lucide-react";
import { setKycNoticeVisibility } from "@/lib/actions/settings.actions";
import { toast } from "sonner";

interface KycNoticeToggleProps {
  initialValue: boolean;
}

export function KycNoticeToggle({ initialValue }: KycNoticeToggleProps) {
  const [isVisible, setIsVisible] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = async (checked: boolean) => {
    setIsLoading(true);
    try {
      const result = await setKycNoticeVisibility(checked);
      if (result.success) {
        setIsVisible(checked);
        toast.success(result.message);
      } else {
        toast.error(result.error || "Đã xảy ra lỗi");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi cập nhật");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <ShieldAlert className="h-4 w-4 text-amber-500" />
          Thông báo KYC 2026
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label htmlFor="kyc-notice" className="text-sm font-medium">
              Hiển thị thông báo KYC
            </Label>
            <p className="text-xs text-muted-foreground">
              Bật/tắt thông báo KYC trên trang Policies
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            <Switch
              id="kyc-notice"
              checked={isVisible}
              onCheckedChange={handleToggle}
              disabled={isLoading}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
