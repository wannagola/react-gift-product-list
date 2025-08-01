import { useEffect, useState } from 'react';
import { fetchProductSummary } from '@/api/product';
import type { GiftItem } from '@/constants/GiftItem';
import { useNavigate } from 'react-router-dom';

export const useProductDetail = (productId: number) => {
  const [product, setProduct] = useState<GiftItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductSummary(productId, navigate)
      .then((p: GiftItem) => {
        setProduct(p);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      })
      .finally(() => setLoading(false));
  }, [productId, navigate]);

  return { product, loading, error };
};
