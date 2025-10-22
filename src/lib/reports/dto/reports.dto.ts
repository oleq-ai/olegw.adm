import { PaginationDto } from "@/lib/shared/dto/pagination.dto";

export interface PullPaymentQuery extends PaginationDto {
  start: string;
  end: string;
  filter?: string;
}

export interface SummaryQuery {
  start: string;
  end: string;
}
