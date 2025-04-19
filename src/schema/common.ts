export interface PaginatedReqParams {
    page: number;
    pageSize: number;
    search?: string;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
}