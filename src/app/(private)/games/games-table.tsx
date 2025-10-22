"use client";

import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { DataTable } from "@/components/ui/data-table";
import { getGamesAction } from "@/lib/games/games.actions";
import { TAGS } from "@/lib/shared/constants";

import { GameTableColumns } from "./game-table-columns";

export default function GamesTable() {
  const router = useRouter();
  const { data, error, isError, isLoading, isRefetching } = useQuery({
    queryKey: [TAGS.GAMES],
    queryFn: async () => {
      const res = await getGamesAction();
      if (!res.success) throw new Error(res.error);
      return res.data;
    },
  });

  return (
    <DataTable
      columns={GameTableColumns}
      data={data?.data ?? []}
      error={isError ? error : undefined}
      isFetching={isLoading}
      onRowClick={({ gameref }) => router.push(`/games/${gameref}`)}
      isRefetching={isRefetching}
      // allowSearch
    />
  );
}
