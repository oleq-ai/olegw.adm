import * as React from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-red-400 text-destructive-foreground hover:bg-destructive/80",
        success:
          "border-transparent bg-[#C6F6D5] dark:bg-[#9ae6b429] text-[#22543D] dark:text-[#9AE6B4]",
        warning:
          "border-transparent bg-[#FEEBC8] dark:bg-[#fbd38d29] text-[#7B341E] dark:text-[#FBD38D]",
        error:
          "border-transparent bg-[#FED7D7] dark:bg-[#feb2b229] text-[#822727] dark:text-[#FEB2B2]",
        outline: "text-foreground",
        muted:
          "border-transparent bg-muted text-muted-foreground hover:bg-muted/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
