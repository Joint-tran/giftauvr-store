"use client";

import {
  AlertTriangle,
  LogOut,
  MessageCircle,
  AlertCircle,
  Languages,
} from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale } from "@/hooks/use-locale";
import Image from "next/image";

interface BanWallProps {
  banReason?: string;
}

export function BanWall({ banReason }: BanWallProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { locale, setLocale, t } = useLocale();

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    await signOut();
    router.push("/sign-in");
  };

  return (
    <div className="fixed inset-0 z-9999 bg-background/95 backdrop-blur-lg flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-2xl w-full bg-card border-2 border-destructive rounded-lg shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in duration-300 my-8">
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
          <div className="rounded-full bg-destructive/10 p-4">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-destructive">
            {t.banWallTitle}
          </h1>
          <p className="text-sm text-muted-foreground">{t.banWallSubtitle}</p>
        </div>

        {/* Ban Reason */}
        <div className="bg-muted/50 rounded-lg p-4 border">
          <h3 className="font-semibold text-sm mb-2">{t.banWallReason}</h3>
          <p className="text-sm text-muted-foreground">
            {banReason || t.banWallNoReason}
          </p>
        </div>

        {/* Appeal Notice */}
        <div className="bg-yellow-500/10 border-2 border-yellow-500/20 rounded-lg p-4 space-y-2">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-500">
                {t.banWallMistake}
              </p>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">
                {t.banWallAppeal}
              </p>
            </div>
          </div>
        </div>

        {/* Signal Contact Section */}
        <div className="bg-linear-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500/20 rounded-xl p-4 sm:p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{t.banWallContactSignal}</h3>
              <p className="text-sm text-muted-foreground">
                {t.banWallContactSecure}
              </p>
            </div>
          </div>

          {/* Signal Image */}
          <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-white/10 shadow-lg">
            <Image
              src="/assets/images/signal.jpg"
              alt="Signal App Contact Information"
              fill
              className="object-contain bg-muted"
              priority
            />
          </div>

          <div className="bg-white/50 dark:bg-black/30 rounded-lg p-4 space-y-2">
            <p className="font-semibold text-sm">{t.banWallHowToContact}</p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>{t.banWallStep1}</li>
              <li>{t.banWallStep2}</li>
              <li>{t.banWallStep3}</li>
              <li>{t.banWallStep4}</li>
            </ol>
          </div>

          <div className="flex items-center gap-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <AlertCircle className="h-4 w-4 text-yellow-600 shrink-0" />
            <p className="text-xs text-muted-foreground">
              <strong>{t.banWallImportant}</strong> {t.banWallSecurity}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <Button
          onClick={handleSignOut}
          disabled={isLoggingOut}
          className="w-full"
          variant="destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          {isLoggingOut ? t.banWallSigningOut : t.banWallSignOut}
        </Button>
      </div>
    </div>
  );
}
