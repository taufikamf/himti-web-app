export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface ErrorResponse {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
} 