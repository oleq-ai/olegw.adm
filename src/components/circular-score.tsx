"use client";

import React from "react";

interface CircularScoreProps {
  score: number;
  maxScore?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  color?: string;
  backgroundColor?: string;
  showMaxScore?: boolean;
  className?: string;
}

export const CircularScore: React.FC<CircularScoreProps> = ({
  score,
  maxScore = 10,
  size = 160,
  strokeWidth = 10,
  label,
  color = "hsl(var(--chart-2))",
  backgroundColor = "hsl(var(--muted))",
  showMaxScore = false,
  className = "",
}) => {
  const percentage = Math.min(Math.max((score / maxScore) * 100, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const center = size / 2;

  // Determine color based on score percentage
  const getScoreColor = () => {
    if (percentage >= 80) return "hsl(142, 76%, 36%)"; // Green
    if (percentage >= 60) return "hsl(48, 96%, 53%)"; // Yellow
    return "hsl(0, 84%, 60%)"; // Red
  };

  const scoreColor = color === "hsl(var(--chart-2))" ? getScoreColor() : color;

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        className="-rotate-90 transform"
        width={size}
        height={size}
        style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
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
        {/* Score circle with gradient */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={scoreColor}
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
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-baseline gap-0.5">
          <div
            className="font-bold leading-none text-foreground"
            style={{ fontSize: size * 0.28 }}
          >
            {typeof score === "number" ? score.toFixed(1) : score}
          </div>
          {showMaxScore && (
            <div
              className="leading-none text-muted-foreground"
              style={{ fontSize: size * 0.12 }}
            >
              /{maxScore}
            </div>
          )}
        </div>
        {label && (
          <div
            className="mt-1 px-2 text-center leading-tight text-muted-foreground"
            style={{ fontSize: size * 0.075 }}
          >
            {label}
          </div>
        )}
      </div>
    </div>
  );
};
