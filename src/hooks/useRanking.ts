import { useEffect, useState } from 'react';
import { fetchRanking, Product, FilterValue } from '@/api/ranking';
import type { TabValue } from '@/api/ranking';

export const useRanking = (filter: FilterValue, type: TabValue) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchRanking(filter, type)
      .then((res) => {
        setProducts(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [filter, type]);

  return { products, loading, error };
};
