import { CircleXIcon } from "lucide-react";

export default function PlayerDetailsError({ error }: { error: string }) {
  return (
    <div className="rounded-md bg-destructive/15 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CircleXIcon className="h-5 w-5 text-destructive" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-destructive">
            Error loading player details
          </h3>
          <div className="mt-2 text-sm text-destructive/80">
            <p>{error}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
