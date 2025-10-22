"use client";

import { HTMLAttributes, Ref, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  fixed?: boolean;
  ref?: Ref<HTMLElement>;
}

export const Header = ({
  className,
  fixed,
  children,
  ...props
}: HeaderProps) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setOffset(document.body.scrollTop || document.documentElement.scrollTop);
    };

    // Add scroll listener to the body
    document.addEventListener("scroll", onScroll, { passive: true });

    // Clean up the event listener on unmount
    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "flex h-16 items-center gap-3 bg-background p-4 sm:gap-4",
        fixed && "header-fixed peer/header fixed z-50 w-[inherit] rounded-md",
        offset > 10 && fixed ? "shadow" : "shadow-none",
        className
      )}
      {...props}
    >
      {children}
    </header>
  );
};

Header.displayName = "Header";
