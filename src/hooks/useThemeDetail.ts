import { useEffect, useState } from 'react';
import { apiClient } from '@/api/apiClient';

interface ThemeDetail {
  themeId: number;
  name: string;
  title: string;
  description: string;
  backgroundColor: string;
}

interface ApiResponse<T> {
  data: T;
}

export function useThemeDetail(themeId: number) {
  const [theme, setTheme] = useState<ThemeDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!themeId) {
      setLoading(false);
      setError(new Error('Theme ID is missing.'));
      return;
    }

    let canceled = false;
    setLoading(true);

    apiClient
      .get<ApiResponse<ThemeDetail>>(`/api/themes/${themeId}/info`)
      .then((res) => {
        if (!canceled) {
          setTheme(res.data.data);
        }
      })
      .catch((err) => {
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
  }, [themeId]);

  return { theme, loading, error };
}
