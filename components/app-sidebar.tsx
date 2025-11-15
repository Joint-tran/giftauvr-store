"use client";

import {
  Home,
  CreditCard,
  Package,
  Wallet,
  User,
  HelpCircle,
  LogOut,
  Languages,
  UserCircle,
  LogIn,
  Clock,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { useLocale } from "@/hooks/use-locale";
import { signOut } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";

interface SidebarUser {
  id: string;
  name: string;
  email: string;
  fullName?: string;
  country?: string;
  accountType?: string;
  network?: string;
  usdtWallet?: string;
  approvalStatus?: string;
  balance?: number;
}

export function AppSidebar({ user }: { user: SidebarUser | null }) {
  const { locale, setLocale, t } = useLocale();
  const handleSignOut = async () => {
    await signOut();
  };

  // Base navigation items
  const baseNavigationItems = [
    {
      title: t.home,
      url: "/",
      icon: Home,
    },
  ];

  // Conditional items based on account type
  const navigationItems = [
    ...baseNavigationItems,
    // Show Buy Cards only for Buyer
    ...(user?.accountType?.toLowerCase() === "buyer"
      ? [
          {
            title: t.buyCards,
            url: "/buy",
            icon: CreditCard,
          },
        ]
      : []),
    // Show Sell Cards only for Seller
    ...(user?.accountType?.toLowerCase() === "seller"
      ? [
          {
            title: t.sellCards,
            url: "/sell",
            icon: Package,
          },
        ]
      : []),
  ];

  const accountItems = [
    {
      title: t.profile,
      url: "/my-profile",
      icon: User,
    },
    {
      title: "Payout Request",
      url: "/payout-request",
      icon: Wallet,
    },
  ];

  const supportItems = [
    {
      title: "Policies",
      url: "/policies",
      icon: HelpCircle,
    },
  ];
  console.log(user);
  return (
    <Sidebar>
      <SidebarHeader className="border-sidebar-border border-b p-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg font-bold">
            <Image
              src={"/logo.svg"}
              width={100}
              height={100}
              alt="Giftauvr Logo"
              className="size-8"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Giftauvr</span>
            <span className="text-sidebar-foreground/70 text-xs">
              Gift Card Marketplace
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="overflow-hidden">
        {/* User Info Section */}
        {user ? (
          <>
            <SidebarGroup className="flex flex-col gap-4">
              <SidebarGroupContent>
                <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent p-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                    <UserCircle className="size-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-1">
                      {" "}
                      <p className="text-sm font-semibold truncate flex items-center gap-1">
                        {user.name}{" "}
                      </p>
                      <div className="flex items-center justify-start gap-1">
                        {" "}
                        <span className="text-[8px] text-ring">
                          {user.accountType}
                        </span>
                        {user.approvalStatus === "pending" && (
                          <span className="text-[8px] flex items-center gap-0.5 text-yellow-500">
                            <Clock className="size-2" />
                            {user.approvalStatus}
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </SidebarGroupContent>
              <SidebarGroupContent>
                <div className="flex items-center gap-2 rounded-lg border border-dashed border-sidebar-border p-3">
                  <DollarSign className="size-4 text-muted-foreground" />
                  <span className="text-xl font-semibold text-primary">
                    {user.balance}
                  </span>
                  <Link
                    href={"/payout-request"}
                    className={buttonVariants({
                      variant: "default",
                      className: "text-xs ml-auto",
                    })}
                  >
                    Payout
                  </Link>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
          </>
        ) : (
          <>
            <SidebarGroup>
              <SidebarGroupContent>
                <div className="flex items-center gap-2 rounded-lg border border-dashed border-sidebar-border p-3">
                  <LogIn className="size-4 text-muted-foreground" />
                  <Link
                    href="/sign-in"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t.signIn}
                  </Link>
                </div>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator />
          </>
        )}

        {/* Navigation Section */}
        <SidebarGroup>
          <SidebarGroupLabel>{t.navigation}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Account Section - Only show if logged in */}
        {user && (
          <>
            <SidebarGroup>
              <SidebarGroupLabel>{t.account}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {accountItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />
          </>
        )}

        {/* Support Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {supportItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-sidebar-border border-t p-2">
        {/* Language Switcher */}
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex items-center justify-between px-2 py-1">
              <div className="flex items-center gap-2 text-sm">
                <Languages className="size-4" />
                <span>{t.language}</span>
              </div>
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
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Sign Out - Only show if logged in */}
        {user && (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={handleSignOut}
                className="cursor-pointer"
              >
                <LogOut />
                <span>{t.signOut}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
