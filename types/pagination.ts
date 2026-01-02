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
  const totalPages = Math.ceil(api.total / api.limit);
  return {
    page: api.page,
    total: api.total,
    filtered: api.total,
    totalPages: totalPages,
    hasPrevious: api.page > 1,
    hasNext: api.page < totalPages,
  };
}
