export interface Pagination {
  page: number;
  totalPages: number;
  total: number;
  filtered: number;
  hasPrevious: boolean;
  hasNext: boolean;
}

// API response pagination format
export interface ApiPagination {
  count: number;
  total: number;
  limit: number;
  page: number;
  totalPages: number;
}

// Helper to convert API pagination to component format
export function mapApiPagination(api: ApiPagination): Pagination {
  return {
    page: api.page,
    totalPages: api.totalPages,
    total: api.total,
    filtered: api.total,
    hasPrevious: api.page > 1,
    hasNext: api.page < api.totalPages,
  };
}
