"use client";

import {
  LayoutDashboard,
  Users,
  CheckCircle,
  Settings,
  LogOut,
  Shield,
  Wallet,
  ShoppingBag,
  ArrowDownToLine,
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
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { adminSignOut } from "@/lib/actions/admin.actions";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await adminSignOut();
    router.push("/admin/auth");
    router.refresh();
  };

  const navigationItems = [
    {
      title: "Dashboard",
      url: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
    },
    {
      title: "Approvals",
      url: "/admin/approvals",
      icon: CheckCircle,
    },
    {
      title: "Gift Cards",
      url: "/admin/egifts",
      icon: ShoppingBag,
    },
    {
      title: "Wallet",
      url: "/admin/wallet",
      icon: Wallet,
    },
    {
      title: "Payouts",
      url: "/admin/payouts",
      icon: ArrowDownToLine,
    },
    {
      title: "Settings",
      url: "/admin/settings",
      icon: Settings,
    },
  ];

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
            <span className="text-sm font-semibold">Giftauvr Admin</span>
            <span className="text-sidebar-foreground/70 text-xs">
              Admin Panel
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="overflow-hidden">
        {/* Admin Info Section */}
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent p-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <Shield className="size-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate">Administrator</p>
                <p className="text-xs text-muted-foreground truncate">
                  Quản trị viên hệ thống
                </p>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Navigation Section */}
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive}>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-sidebar-border border-t p-2">
        {/* Sign Out */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleSignOut}
              className="cursor-pointer"
            >
              <LogOut />
              <span>Đăng xuất</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
