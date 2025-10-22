import React from "react";

import { cn } from "@/lib/utils";

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

function Timeline({ children, className }: TimelineProps) {
  return <div className={cn("relative space-y-2", className)}>{children}</div>;
}

interface TimelineItemProps {
  children: React.ReactNode;
  className?: string;
}

function TimelineItem({ children, className }: TimelineItemProps) {
  return (
    <div className={cn("relative flex items-start", className)}>{children}</div>
  );
}

interface TimelineDotProps {
  className?: string;
}

function TimelineDot({ className }: TimelineDotProps) {
  return (
    <div className="relative mr-4 flex flex-col items-center pt-1.5">
      <div
        className={cn(
          "z-10 flex h-4 w-4 shrink-0 rounded-full",
          className || "bg-primary"
        )}
      />
    </div>
  );
}

interface TimelineConnectorProps {
  className?: string;
}

function TimelineConnector({ className }: TimelineConnectorProps) {
  return (
    <div
      className={cn(
        "absolute left-2 top-5 h-full w-[2px] -translate-x-1/2 bg-muted",
        className
      )}
    />
  );
}

interface TimelineContentProps {
  children: React.ReactNode;
  className?: string;
}

function TimelineContent({ children, className }: TimelineContentProps) {
  return <div className={cn("flex-1 pb-6", className)}>{children}</div>;
}

export {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
};
