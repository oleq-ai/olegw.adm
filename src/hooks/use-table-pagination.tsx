import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { PaginationState, Table, Updater } from "@tanstack/react-table";

export default function useTablePagination<TData>(pagination: PaginationState) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);

      if (value) params.set(name, value);
      else if (!value) params.delete(name);

      return params.toString();
    },
    [searchParams]
  );

  const update = (name: string, value: string) =>
    router.push(`${pathname}?${updateQueryString(name, value)}`);

  const setPagination = (
    table: Table<TData>,
    updater: Updater<PaginationState>
  ) => {
    if (typeof updater === "function") {
      const { pageIndex, pageSize } = updater(table.getState().pagination);
      if (pageIndex !== pagination.pageIndex)
        update("page", (pageIndex + 1).toString());

      if (pageSize !== pagination.pageSize)
        update("pageSize", pageSize.toString());
    } else {
      const { pageIndex, pageSize } = updater;
      if (pageIndex !== pagination.pageIndex)
        update("page", (pageIndex + 1).toString());

      if (pageSize !== pagination.pageSize)
        update("pageSize", pageSize.toString());
    }
  };

  return { setPagination };
}
