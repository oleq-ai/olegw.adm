import {
  Bell,
  LucideIcon,
  Monitor,
  Palette,
  Settings,
  User,
} from "lucide-react";

export type ProfileData = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const profileData: ProfileData[] = [
  {
    label: "Profile",
    href: "/settings",
    icon: User,
  },
  {
    label: "Account",
    href: "/settings/account",
    icon: Settings,
  },
  {
    label: "Appearance",
    href: "/settings/appearance",
    icon: Palette,
  },
  {
    label: "Notifications",
    href: "/settings/notifications",
    icon: Bell,
  },
  {
    label: "Display",
    href: "/settings/display",
    icon: Monitor,
  },
];
