import { ColumnDef } from "@tanstack/react-table";

import { Game } from "@/lib/games/types/game.types";

export const GameTableColumns: ColumnDef<Game>[] = [
  { header: "Name", accessorKey: "gamename" },
  { header: "Code", accessorKey: "gamecode" },
  { header: "Active", accessorKey: "active" },
  {
    header: "Banner",
    accessorKey: "gamedata.banner",
    cell: ({ row: { original } }) => (
      <img
        src={original.gamedata.banner}
        alt="Banner"
        width={80}
        height={80}
        className="rounded-md"
      />
    ),
  },
];
