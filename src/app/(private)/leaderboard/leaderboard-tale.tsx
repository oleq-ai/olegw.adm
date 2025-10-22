"use client";

import { format, startOfMonth } from "date-fns";
import { Trophy } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import DataTableSelect from "@/components/ui/data-table-select";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import useUpdateSearchParams from "@/hooks/use-update-search-params";
import { LeaderboardType } from "@/lib/accounts/leaderboard/leaderboard.types";

import { LeaderboardTableColumns } from "./leaderboard-columns";

const LEADERBOARD_TYPES = [
  { label: "Top Cashouts", value: "topcashout" as LeaderboardType },
  //   { label: "Top Deposits", value: "topdeposits" as LeaderboardType },
] as const;

export default function LeaderboardTable() {
  const { getParsedSearchParams } = useUpdateSearchParams();
  const searchParams = getParsedSearchParams();

  const type = (searchParams.type as LeaderboardType) ?? "topcashout";
  const start =
    searchParams.start ?? format(startOfMonth(new Date()), "yyyy-MM-dd");
  const end = searchParams.end ?? format(new Date(), "yyyy-MM-dd");

  const { data, error, isError, isLoading, isRefetching } = useLeaderboard({
    type,
    startdate: start,
    enddate: end,
  });

  //   const handleExport = async () => {
  //     try {
  //       const res = await getLeaderboardAction({
  //         type,
  //         startdate: start,
  //         enddate: end,
  //       });

  //       if (!res.success) throw new Error(res.error);

  //       const exportData = res.data.data.map(
  //         ({ username, bet, won }: LeaderboardEntry, index: number) => ({
  //           rank: index + 1,
  //           username,
  //           totalBet: Number(bet).toFixed(2),
  //           totalWon: Number(won).toFixed(2),
  //           winRatio: ((Number(won) / Number(bet)) * 100).toFixed(2) + '%',
  //         })
  //       );

  //       const worksheet = XLSX.utils.json_to_sheet(exportData);
  //       const workbook = XLSX.utils.book_new();
  //       XLSX.utils.book_append_sheet(workbook, worksheet, "Leaderboard");

  //       const filename = `leaderboard_${type}_${start}_to_${end}.xlsx`;
  //       XLSX.writeFile(workbook, filename);

  //       toast.success("Leaderboard exported successfully!");
  //     } catch (error) {
  //       toast.error(
  //         `Failed to export leaderboard: ${
  //           error instanceof Error ? error.message : "Unknown error"
  //         }`
  //       );
  //     }
  //   };

  const currentTypeLabel =
    LEADERBOARD_TYPES.find((t) => t.value === type)?.label || "Leaderboard";

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            {currentTypeLabel}
          </CardTitle>
          <CardDescription>
            Top performers from {start} to {end}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <div className="flex justify-between mb-4">
            <div></div>
            <Button
              variant="outline"
              size="sm"
              className="h-8 text-gray-800"
              onClick={handleExport}
              disabled={isLoading || !data?.data?.length}
            >
              <Download className="mr-2 h-4 w-4" />
              Export EXCEL
            </Button>
          </div> */}

          <DataTable
            columns={LeaderboardTableColumns}
            data={data?.data ?? []}
            error={isError ? error : undefined}
            isFetching={isLoading}
            isRefetching={isRefetching}
            filterByDate
            headerComponent={
              <DataTableSelect
                name="type"
                placeholder="Select Leaderboard Type"
                options={LEADERBOARD_TYPES.map((type) => ({
                  label: type.label,
                  value: type.value,
                }))}
              />
            }
          />

          {data?.data && data.data.length === 0 && !isLoading && (
            <div className="py-8 text-center text-muted-foreground">
              No data available for the selected period
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
