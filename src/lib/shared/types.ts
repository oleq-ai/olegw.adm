export type Response<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export type PaginationQuery = {
  pageSize?: number;
  page?: number;
};

export interface Meta {
  pageCount: number;
  pageSize: number;
  currentPage: number;
  itemCount: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: Meta;
}
