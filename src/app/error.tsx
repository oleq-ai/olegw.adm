"use client";

// Error boundaries must be Client Components
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    // Log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error({ error });
  }, [error]);

  return (
    <div className={cn("h-svh w-full")}>
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">500</h1>

        <span className="font-medium">Oops! Something went wrong {`:')`}</span>
        <p className="text-center text-muted-foreground">
          We apologize for the inconvenience. <br /> Please try again later.
        </p>

        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => reset()}>
            Try again
          </Button>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </div>
      </div>
    </div>
  );
}
