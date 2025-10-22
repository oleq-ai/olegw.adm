"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";

import { signOutAction } from "@/lib/auth/auth.actions";

import { DropdownMenuItem } from "../ui/dropdown-menu";

type Props = {
  hasIcon?: boolean;
};

export default function LogoutMenuItem({ hasIcon = false }: Props) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const logoutHandler = async () => {
    setIsPending(true);
    const res = await signOutAction();
    setIsPending(false);
    if (!res.success) {
      toast.error(res.error);
      return;
    }
    toast.success("Logged out successfully");
    router.replace("/sign-in");
  };

  return (
    <DropdownMenuItem onClick={logoutHandler} disabled={isPending}>
      {hasIcon && <LogOut />}
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <span>Log out</span>
      )}
    </DropdownMenuItem>
  );
}
