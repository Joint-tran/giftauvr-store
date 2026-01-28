"use client";

import {
  ShieldAlert,
  Languages,
  FileCheck,
  Camera,
  CreditCard,
  CheckCircle2,
  Clock,
  XCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { useLocale } from "@/hooks/use-locale";
import { useRouter } from "next/navigation";

interface KycWallProps {
  kycStatus?: "pending" | "submitted" | "approved" | "rejected";
  kycReason?: string;
}

const kycTranslations = {
  en: {
    title: "Identity Verification Required",
    subtitle: "To continue using our services, please complete identity verification",
    reason: "Reason for verification request:",
    noReason: "Account security verification required",
    pendingTitle: "Verification Pending",
    pendingDesc: "Please complete your identity verification to continue",
    submittedTitle: "Under Review",
    submittedDesc: "Your documents are being reviewed. This usually takes 1-3 business days.",
    rejectedTitle: "Verification Rejected",
    rejectedDesc: "Your verification was rejected. Please submit valid documents.",
    startVerification: "Start Verification",
    resubmit: "Resubmit Documents",
    step1: "Select Document Type",
    step1Desc: "Choose a valid government-issued ID",
    step2: "Upload Documents",
    step2Desc: "Take clear photos of your ID front and back",
    step3: "Take Selfie",
    step3Desc: "Take a photo holding your ID next to your face",
    restrictedActions: "Restricted Actions",
    restrictedDesc: "Until verification is complete, you cannot:",
    restrictedSell: "Sell gift cards",
    restrictedWithdraw: "Request payouts",
    restrictedTransfer: "Transfer funds",
  },
  ru: {
    title: "Требуется верификация личности",
    subtitle: "Для продолжения использования наших услуг, пожалуйста, пройдите верификацию",
    reason: "Причина запроса верификации:",
    noReason: "Требуется проверка безопасности аккаунта",
    pendingTitle: "Ожидается верификация",
    pendingDesc: "Пожалуйста, завершите верификацию личности для продолжения",
    submittedTitle: "На рассмотрении",
    submittedDesc: "Ваши документы проверяются. Обычно это занимает 1-3 рабочих дня.",
    rejectedTitle: "Верификация отклонена",
    rejectedDesc: "Ваша верификация была отклонена. Пожалуйста, отправьте действительные документы.",
    startVerification: "Начать верификацию",
    resubmit: "Отправить документы повторно",
    step1: "Выберите тип документа",
    step1Desc: "Выберите действительный документ удостоверяющий личность",
    step2: "Загрузите документы",
    step2Desc: "Сделайте чёткие фото лицевой и обратной стороны документа",
    step3: "Сделайте селфи",
    step3Desc: "Сделайте фото с документом рядом с лицом",
    restrictedActions: "Ограниченные действия",
    restrictedDesc: "До завершения верификации вы не можете:",
    restrictedSell: "Продавать подарочные карты",
    restrictedWithdraw: "Запрашивать выплаты",
    restrictedTransfer: "Переводить средства",
  },
};

export function KycWall({ kycStatus = "pending", kycReason }: KycWallProps) {
  const { locale, setLocale } = useLocale();
  const router = useRouter();
  const t = kycTranslations[locale] || kycTranslations.en;

  const getStatusInfo = () => {
    switch (kycStatus) {
      case "submitted":
        return {
          icon: Clock,
          title: t.submittedTitle,
          desc: t.submittedDesc,
          color: "text-yellow-500",
          bgColor: "bg-yellow-500/10",
          borderColor: "border-yellow-500/20",
        };
      case "rejected":
        return {
          icon: XCircle,
          title: t.rejectedTitle,
          desc: t.rejectedDesc,
          color: "text-red-500",
          bgColor: "bg-red-500/10",
          borderColor: "border-red-500/20",
        };
      default:
        return {
          icon: ShieldAlert,
          title: t.pendingTitle,
          desc: t.pendingDesc,
          color: "text-orange-500",
          bgColor: "bg-orange-500/10",
          borderColor: "border-orange-500/20",
        };
    }
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  return (
    <div className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-lg flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-2xl w-full bg-card border-2 border-orange-500/30 rounded-lg shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in duration-300 my-8">
        {/* Language Switcher */}
        <div className="flex justify-end gap-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Languages className="h-4 w-4" />
            <div className="flex gap-1">
              <Button
                variant={locale === "en" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setLocale("en")}
                className="h-7 px-2 text-xs"
              >
                EN
              </Button>
              <Button
                variant={locale === "ru" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setLocale("ru")}
                className="h-7 px-2 text-xs"
              >
                RU
              </Button>
            </div>
          </div>
        </div>

        {/* Icon */}
        <div className="flex justify-center">
          <div className={`rounded-full ${statusInfo.bgColor} p-4`}>
            <StatusIcon className={`h-12 w-12 ${statusInfo.color}`} />
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className={`text-2xl font-bold ${statusInfo.color}`}>
            {t.title}
          </h1>
          <p className="text-sm text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Status Card */}
        <div className={`${statusInfo.bgColor} ${statusInfo.borderColor} border-2 rounded-lg p-4`}>
          <div className="flex items-center gap-3">
            <StatusIcon className={`h-6 w-6 ${statusInfo.color}`} />
            <div>
              <h3 className={`font-semibold ${statusInfo.color}`}>{statusInfo.title}</h3>
              <p className="text-sm text-muted-foreground">{statusInfo.desc}</p>
            </div>
          </div>
        </div>

        {/* Reason */}
        {kycReason && (
          <div className="bg-muted/50 rounded-lg p-4 border">
            <h3 className="font-semibold text-sm mb-2">{t.reason}</h3>
            <p className="text-sm text-muted-foreground">
              {kycReason || t.noReason}
            </p>
          </div>
        )}

        {/* Verification Steps */}
        {(kycStatus === "pending" || kycStatus === "rejected") && (
          <div className="space-y-4">
            <div className="grid gap-3">
              <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{t.step1}</p>
                  <p className="text-xs text-muted-foreground">{t.step1Desc}</p>
                </div>
                <span className="text-xs text-muted-foreground">1</span>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FileCheck className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{t.step2}</p>
                  <p className="text-xs text-muted-foreground">{t.step2Desc}</p>
                </div>
                <span className="text-xs text-muted-foreground">2</span>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-lg border bg-card">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Camera className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{t.step3}</p>
                  <p className="text-xs text-muted-foreground">{t.step3Desc}</p>
                </div>
                <span className="text-xs text-muted-foreground">3</span>
              </div>
            </div>
          </div>
        )}

        {/* Restricted Actions */}
        <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
          <h3 className="font-semibold text-sm text-red-600 dark:text-red-400 mb-2">
            {t.restrictedActions}
          </h3>
          <p className="text-xs text-muted-foreground mb-3">{t.restrictedDesc}</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-500" />
              {t.restrictedSell}
            </li>
            <li className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-500" />
              {t.restrictedWithdraw}
            </li>
            <li className="flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-500" />
              {t.restrictedTransfer}
            </li>
          </ul>
        </div>

        {/* Action Button */}
        {(kycStatus === "pending" || kycStatus === "rejected") && (
          <Button 
            className="w-full" 
            size="lg"
            onClick={() => router.push("/kyc-verification")}
          >
            {kycStatus === "rejected" ? t.resubmit : t.startVerification}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
