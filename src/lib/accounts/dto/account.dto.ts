import { PaginationDto } from "@/lib/shared/dto/pagination.dto";

export interface GetStatementDto extends PaginationDto {
  start: string;
  end: string;
}
