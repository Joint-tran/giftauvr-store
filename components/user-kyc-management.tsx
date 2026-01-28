"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  MoreHorizontal,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react";
import {
  requireKycForUser,
  approveKyc,
  rejectKyc,
  removeKycRequirement,
} from "@/lib/actions/kyc.actions";
import { toast } from "sonner";

interface UserKycManagementProps {
  userId: string;
  userEmail: string;
  userName: string;
  kycRequired?: boolean;
  kycStatus?: "pending" | "submitted" | "approved" | "rejected";
  kycDocumentFront?: string;
  kycDocumentBack?: string;
  kycSelfie?: string;
}

export function UserKycManagement({
  userId,
  userEmail,
  userName,
  kycRequired = false,
  kycStatus,
  kycDocumentFront,
  kycDocumentBack,
  kycSelfie,
}: UserKycManagementProps) {
  const [requireOpen, setRequireOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [kycReason, setKycReason] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRequireKyc = async () => {
    if (!kycReason.trim()) {
      toast.error("Vui lòng nhập lý do yêu cầu KYC");
      return;
    }

    setIsLoading(true);
    try {
      const result = await requireKycForUser({
        userEmail,
        reason: kycReason,
      });
      if (result.success) {
        toast.success(result.message);
        setRequireOpen(false);
        setKycReason("");
        window.location.reload();
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("Có lỗi xảy ra khi yêu cầu KYC");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproveKyc = async () => {
    setIsLoading(true);
    try {
      const result = await approveKyc(userEmail);
      if (result.success) {
        toast.success(result.message);
        setReviewOpen(false);
        window.location.reload();
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("Có lỗi xảy ra khi duyệt KYC");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRejectKyc = async () => {
    if (!rejectReason.trim()) {
      toast.error("Vui lòng nhập lý do từ chối");
      return;
    }

    setIsLoading(true);
    try {
      const result = await rejectKyc({ userEmail, reason: rejectReason });
      if (result.success) {
        toast.success(result.message);
        setRejectOpen(false);
        setRejectReason("");
        window.location.reload();
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("Có lỗi xảy ra khi từ chối KYC");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveKycRequirement = async () => {
    setIsLoading(true);
    try {
      const result = await removeKycRequirement(userEmail);
      if (result.success) {
        toast.success(result.message);
        window.location.reload();
      } else {
        toast.error(result.error);
      }
    } catch {
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  const getKycStatusBadge = () => {
    if (!kycRequired) {
      return (
        <Badge variant="outline" className="gap-1">
          <ShieldCheck className="h-3 w-3" />
          No KYC
        </Badge>
      );
    }

    switch (kycStatus) {
      case "submitted":
        return (
          <Badge className="gap-1 bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
            <Clock className="h-3 w-3" />
            Submitted
          </Badge>
        );
      case "approved":
        return (
          <Badge className="gap-1 bg-green-500/10 text-green-600 border-green-500/20">
            <CheckCircle2 className="h-3 w-3" />
            Verified
          </Badge>
        );
      case "rejected":
        return (
          <Badge variant="destructive" className="gap-1">
            <XCircle className="h-3 w-3" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge className="gap-1 bg-orange-500/10 text-orange-600 border-orange-500/20">
            <ShieldAlert className="h-3 w-3" />
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="flex items-center gap-2">
      {getKycStatusBadge()}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {!kycRequired && (
            <DropdownMenuItem onSelect={() => setRequireOpen(true)}>
              <ShieldAlert className="mr-2 h-4 w-4 text-orange-500" />
              Yêu cầu KYC
            </DropdownMenuItem>
          )}

          {kycRequired && kycStatus === "submitted" && (
            <>
              <DropdownMenuItem onSelect={() => setReviewOpen(true)}>
                <Eye className="mr-2 h-4 w-4" />
                Xem & Duyệt
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setRejectOpen(true)}>
                <ShieldX className="mr-2 h-4 w-4 text-red-500" />
                Từ chối
              </DropdownMenuItem>
            </>
          )}

          {kycRequired && kycStatus !== "approved" && (
            <DropdownMenuItem onSelect={handleRemoveKycRequirement}>
              <ShieldCheck className="mr-2 h-4 w-4 text-green-500" />
              Bỏ yêu cầu KYC
            </DropdownMenuItem>
          )}

          {kycRequired && kycStatus === "rejected" && (
            <DropdownMenuItem onSelect={() => setRequireOpen(true)}>
              <ShieldAlert className="mr-2 h-4 w-4 text-orange-500" />
              Yêu cầu KYC lại
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Require KYC Dialog */}
      <Dialog open={requireOpen} onOpenChange={setRequireOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Yêu cầu KYC</DialogTitle>
            <DialogDescription>
              Yêu cầu {userName} xác minh danh tính
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="kycReason">Lý do yêu cầu KYC *</Label>
              <Textarea
                id="kycReason"
                placeholder="VD: Phát hiện hoạt động đáng ngờ, giao dịch giá trị cao..."
                value={kycReason}
                onChange={(e) => setKycReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRequireOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleRequireKyc} disabled={isLoading}>
              {isLoading ? "Đang xử lý..." : "Yêu cầu KYC"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review KYC Dialog */}
      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Xem xét KYC - {userName}</DialogTitle>
            <DialogDescription>
              Kiểm tra tài liệu và quyết định duyệt hoặc từ chối
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            {kycDocumentFront && (
              <div className="space-y-2">
                <Label>Mặt trước giấy tờ</Label>
                <div className="border rounded-lg overflow-hidden aspect-video">
                  <img
                    src={kycDocumentFront}
                    alt="Document Front"
                    className="w-full h-full object-contain bg-muted"
                  />
                </div>
              </div>
            )}
            {kycDocumentBack && (
              <div className="space-y-2">
                <Label>Mặt sau giấy tờ</Label>
                <div className="border rounded-lg overflow-hidden aspect-video">
                  <img
                    src={kycDocumentBack}
                    alt="Document Back"
                    className="w-full h-full object-contain bg-muted"
                  />
                </div>
              </div>
            )}
            {kycSelfie && (
              <div className="space-y-2 col-span-2">
                <Label>Selfie với giấy tờ</Label>
                <div className="border rounded-lg overflow-hidden aspect-video max-w-md mx-auto">
                  <img
                    src={kycSelfie}
                    alt="Selfie"
                    className="w-full h-full object-contain bg-muted"
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewOpen(false)}>
              Đóng
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setReviewOpen(false);
                setRejectOpen(true);
              }}
            >
              Từ chối
            </Button>
            <Button onClick={handleApproveKyc} disabled={isLoading}>
              {isLoading ? "Đang xử lý..." : "Duyệt KYC"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject KYC Dialog */}
      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Từ chối KYC</DialogTitle>
            <DialogDescription>
              Từ chối xác minh danh tính của {userName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rejectReason">Lý do từ chối *</Label>
              <Textarea
                id="rejectReason"
                placeholder="VD: Ảnh không rõ ràng, giấy tờ hết hạn, thông tin không khớp..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectOpen(false)}>
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectKyc}
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Từ chối"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
