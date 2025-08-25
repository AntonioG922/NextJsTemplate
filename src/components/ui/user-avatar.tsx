"use client";

import { DEFAULT_AVATAR_ICON } from "@/constants/avatarIcons";
import { useProfile } from "@/hooks/useProfile";
import { AvatarPreview } from "./avatar-preview";

interface UserAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showBackground?: boolean;
  // userId?: string // For future use when showing other users' avatars
}

export function UserAvatar({
  size = "md",
  className,
  showBackground = true,
}: UserAvatarProps) {
  const { profile } = useProfile();

  // For now, we only support current user's avatar
  // In the future, this could fetch other users' profiles
  const avatarIcon = profile?.avatar_icon || DEFAULT_AVATAR_ICON;

  return (
    <AvatarPreview
      iconName={avatarIcon}
      size={size}
      className={className}
      showBackground={showBackground}
    />
  );
}
