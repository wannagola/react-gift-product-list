import { useState, useEffect } from 'react';
import { apiClient } from '@/api/apiClient';

interface ApiResponse<T> {
  data: T;
}

export function useFetch<T = any>(
  endpoint: string,
  params?: Record<string, any>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let canceled = false;
    setLoading(true);
    apiClient
      .get<ApiResponse<T>>(endpoint, { params })
      .then(res => {
        if (!canceled) setData(res.data.data);
      })
      .catch(err => {
        if (!canceled) setError(err);
      })
      .finally(() => {
        if (!canceled) setLoading(false);
      });

    return () => {
      canceled = true;
    };
  }, [endpoint, JSON.stringify(params)]);

  return { data, loading, error };
}
