import { useEffect, useState } from 'react';
import { fetchProductSummary } from '@/api/product';
import type { Product } from '@/api/ranking';
import { useNavigate } from 'react-router-dom';

export const useProductSummary = (productId: number) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const navigate = useNavigate(); // ✅ navigate 훅 사용

  useEffect(() => {
    setLoading(true);

    fetchProductSummary(String(productId), navigate)
      .then((res) => {
        setProduct(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [productId, navigate]);

  return { product, loading, error };
};
