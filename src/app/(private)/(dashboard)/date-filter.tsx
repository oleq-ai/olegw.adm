"use client";

import { useSearchParams } from "next/navigation";

import { format, startOfMonth } from "date-fns";

import { DateRangePicker } from "@/components/ui/date-range-picker";
import useUpdateSearchParams from "@/hooks/use-update-search-params";

export default function DateFilter() {
  const searchParams = useSearchParams();

  const { setSearchParams } = useUpdateSearchParams();

  const initialDateFrom =
    searchParams.get("start") ?? format(startOfMonth(new Date()), "yyyy-MM-dd");
  const initialDateTo =
    searchParams.get("end") ?? format(new Date(), "yyyy-MM-dd");

  return (
    <div className="mb-6 flex flex-col justify-end gap-4 sm:flex-row">
      <DateRangePicker
        onUpdate={(values) => {
          setSearchParams({
            start: format(values.range.from, "yyyy-MM-dd"),
            ...(values.range.to && {
              end: format(values.range.to, "yyyy-MM-dd"),
            }),
          });
        }}
        initialDateFrom={initialDateFrom}
        initialDateTo={initialDateTo}
        align="start"
        locale="en-LS"
        showCompare={false}
      />
    </div>
  );
}
