
export interface IPagination{
  currentPage:number,
  itemsPerPage:number,
  itemsCount:number,
  totalPages:number
}

export class PaginatedResult<T>{
  result!:T;
  pagination!:IPagination;
}