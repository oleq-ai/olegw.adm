"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { signOutAction } from "@/lib/auth/auth.actions";

export const ONE_MINUTE = 60 * 1000;
export const WARNING_TIME = 2 * ONE_MINUTE;

export const useInactivityTimer = (INACTIVITY_TIME: number) => {
  const [showWarning, setShowWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(WARNING_TIME);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimers = useCallback(() => {
    // Clear existing timers
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    if (countdownIntervalRef.current)
      clearInterval(countdownIntervalRef.current);

    // Start warning timer
    warningTimerRef.current = setTimeout(() => {
      setShowWarning(true);
      countdownIntervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => Math.max(0, prev - 1000));
      }, 1000);
    }, INACTIVITY_TIME - WARNING_TIME);

    // Start inactivity timer
    inactivityTimerRef.current = setTimeout(async () => {
      await signOutAction();
      if (typeof window !== "undefined") window.location.reload();
    }, INACTIVITY_TIME);
  }, [INACTIVITY_TIME]);

  const resetTimer = useCallback(() => {
    // Clear timers
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    if (countdownIntervalRef.current)
      clearInterval(countdownIntervalRef.current);

    // Reset state
    setShowWarning(false);
    setTimeRemaining(WARNING_TIME);

    // Restart timers
    startTimers();
  }, [startTimers]);

  useEffect(() => {
    const events = ["mousedown", "keydown", "touchstart", "scroll"];

    // Add event listeners
    events.forEach((event) => document.addEventListener(event, resetTimer));

    // Start timers initially (without calling setState in effect)
    startTimers();

    return () => {
      // Cleanup
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
      if (countdownIntervalRef.current)
        clearInterval(countdownIntervalRef.current);
      events.forEach((event) =>
        document.removeEventListener(event, resetTimer)
      );
    };
  }, [resetTimer, startTimers]);

  return { showWarning, timeRemaining, resetTimer };
};
