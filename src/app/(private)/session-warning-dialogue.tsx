"use client";

import { CircularProgress } from "@/components/circular-progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ONE_MINUTE, WARNING_TIME } from "@/hooks//use-inactivity-timer";

interface Props {
  isOpen: boolean;
  onStaySignedIn: () => void;
  timeRemaining: number;
}

export default function SessionWarningDialogue({
  isOpen,
  onStaySignedIn,
  timeRemaining,
}: Props) {
  const progressPercentage = (timeRemaining / WARNING_TIME) * 100;
  const minutes = Math.floor(timeRemaining / ONE_MINUTE);
  const seconds = Math.floor((timeRemaining % ONE_MINUTE) / 1000);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Session Expiring Soon</AlertDialogTitle>
          <AlertDialogDescription>
            Your session is about to expire due to inactivity. Would you like to
            stay signed in?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="relative my-4 flex justify-center">
          <CircularProgress
            value={progressPercentage}
            size={200}
            strokeWidth={15}
            showPercentage={false}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold">{minutes} Min</div>
              <div className="text-xl">{seconds} Sec</div>
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onStaySignedIn}>
            Stay Signed In
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
