import { useState, useEffect, useCallback, useRef } from 'react';
import { apiClient } from '@/api/apiClient';
import { GiftItem } from '@/constants/GiftItem';

interface ThemeProductsResponse {
  list: GiftItem[];
  cursor: number;
  hasMoreList: boolean;
}

interface ApiResponse<T> {
  data: T;
}

const PRODUCTS_LIMIT = 10;

export function useThemeProducts(themeId: number) {
  const [products, setProducts] = useState<GiftItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const cursorRef = useRef<number>(0);

  const fetchMore = useCallback(async () => {
    if (!themeId || !hasMore || loading) return;

    setLoading(true);
    setError(null);

    try {
      const res = await apiClient.get<ApiResponse<ThemeProductsResponse>>(
        `/api/themes/${themeId}/products`,
        {
          params: { cursor: cursorRef.current, limit: PRODUCTS_LIMIT },
        }
      );

      if (res.data.data) {
        setProducts((prevProducts) => {
          const newProducts = res.data.data.list.filter(
            (newItem) => !prevProducts.some((prevItem) => prevItem.id === newItem.id)
          );
          return [...prevProducts, ...newProducts];
        });
        cursorRef.current = res.data.data.cursor;
        setHasMore(res.data.data.hasMoreList);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [themeId, hasMore, loading]);

  useEffect(() => {
    setProducts([]);
    cursorRef.current = 0;
    setHasMore(true);
    setError(null);
    fetchMore();
  }, [themeId]);

  return { products, loading, error, fetchMore, hasMore };
}
