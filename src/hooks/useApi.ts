import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';
import { ErrorResponse } from '@/types/api';

interface UseApiResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>
): UseApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiFunction(...args);
        setData(result);
        return result;
      } catch (err) {
        let errorMessage = 'An unexpected error occurred';
        
        if (err instanceof AxiosError) {
          const errorResponse = err.response?.data as ErrorResponse;
          errorMessage = errorResponse?.message || err.message;
        }
        
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  return { data, loading, error, execute, reset };
} 