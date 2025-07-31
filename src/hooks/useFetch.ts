import { useEffect, useState } from 'react';
import { apiClient } from '@/api/apiClient';

interface ApiResponse<T> {
  data: T;
  status: string;
  message?: string;
}

export function useFetch<T>(
  endpoint: string,
  params?: Record<string, unknown>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let canceled = false;
    setLoading(true);

    apiClient
      .get<ApiResponse<T>>(endpoint, { params })
      .then((res: { data: ApiResponse<T> }) => {
        if (!canceled) {
          setData(res.data.data);
        }
      })
      .catch((err: Error) => {
        if (!canceled) {
          setError(err);
        }
      })
      .finally(() => {
        if (!canceled) {
          setLoading(false);
        }
      });

    return () => {
      canceled = true;
    };
  }, [endpoint, params]);

  return { data, loading, error };
}
