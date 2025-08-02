import { useEffect, useState } from 'react';
import { fetchRanking, Product, FilterValue, TabValue } from '@/api/ranking';

export const useRanking = (filter: FilterValue, type: TabValue) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchRanking(filter, type)
      .then((list) => {
        if (!cancelled) setProducts(list);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [filter, type]);

  return { products, loading, error };
};
