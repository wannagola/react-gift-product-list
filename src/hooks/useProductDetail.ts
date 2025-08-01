import { useEffect, useState } from 'react';
import { fetchProductBasic, ProductBasic } from '@/api/product';
import type { GiftItem } from '@/constants/GiftItem';

export const useProductSummary = (productId: number) => {
  const [product, setProduct] = useState<GiftItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchProductBasic(productId)
      .then((p: ProductBasic) => {
        setProduct({
          id: p.id,
          name: p.name,
          imageURL: p.imageURL,
          price: p.price,
          brandName: p.brandName,
        });
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      })
      .finally(() => setLoading(false));
  }, [productId]);

  return { product, loading, error };
};
