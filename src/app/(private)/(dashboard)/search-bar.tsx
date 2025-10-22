import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row">
      <div className="relative flex-grow">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-muted-foreground" />
        </div>
        <Input
          type="text"
          className="pl-10"
          placeholder="Search users, bets, events..."
        />
      </div>
      <Button className="w-full sm:w-auto">Search</Button>
    </div>
  );
}
