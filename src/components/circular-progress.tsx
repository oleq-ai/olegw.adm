"use client";

import React from "react";

import { LucideIcon } from "lucide-react";

interface CircularProgressProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  icon?: LucideIcon;
  showPercentage?: boolean;
  color?: string;
  backgroundColor?: string;
  className?: string;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  max = 100,
  size = 200,
  strokeWidth = 12,
  label,
  icon: Icon,
  showPercentage = true,
  color = "hsl(var(--primary))",
  backgroundColor = "hsl(var(--muted))",
  className = "",
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const center = size / 2;

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        className="-rotate-90 transform"
        width={size}
        height={size}
        style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.1))" }}
      >
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </svg>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        {Icon && (
          <Icon
            className="text-primary"
            style={{ width: size * 0.15, height: size * 0.15 }}
          />
        )}
        {showPercentage && (
          <div
            className="font-bold leading-none text-foreground"
            style={{ fontSize: size * 0.2 }}
          >
            {Math.round(percentage)}%
          </div>
        )}
        {label && (
          <div
            className="px-2 text-center leading-tight text-muted-foreground"
            style={{ fontSize: size * 0.065 }}
          >
            {label}
          </div>
        )}
      </div>
    </div>
  );
};
