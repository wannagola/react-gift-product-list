import { useEffect, useState } from 'react';
import { fetchProductBasic, ProductBasic } from '@/api/product';
import type { GiftItem } from '@/constants/GiftItem';

export const useProductDetail = (productId: number) => {
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
          brandInfo: p.brandInfo,
        });
      })
      .catch(setError)
      .finally(() => setLoading(false));
  }, [productId]);

  return { product, loading, error };
};
