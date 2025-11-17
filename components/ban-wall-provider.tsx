"use client";

import { BanWall } from "./ban-wall";
import { useEffect, useState } from "react";

interface BanWallProviderProps {
  children: React.ReactNode;
  user: User | null;
}

export function BanWallProvider({ children, user }: BanWallProviderProps) {
  const [showBanWall, setShowBanWall] = useState(false);

  useEffect(() => {
    // Check if user is banned
    if (user && user.isBanned) {
      setShowBanWall(true);
      // Disable all keyboard shortcuts and interactions
      document.body.style.overflow = "hidden";
    } else {
      setShowBanWall(false);
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [user]);

  // If user is banned, only show the ban wall
  if (showBanWall && user?.isBanned) {
    return <BanWall banReason={user.banReason} />;
  }

  return <>{children}</>;
}
