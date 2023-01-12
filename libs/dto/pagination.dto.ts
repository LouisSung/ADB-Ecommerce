import { Pagination } from 'nestjs-typeorm-paginate';


export class PaginationDto<T> extends Pagination<T> {
  override meta: {
    totalItems?: number;

    itemCount: number;

    itemsPerPage: number;

    totalPages?: number;

    currentPage: number;
  }
}
