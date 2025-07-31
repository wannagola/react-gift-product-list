import { useEffect, useState } from 'react';
import { fetchProductSummary } from '@/api/product';
import { useNavigate } from 'react-router-dom';
import { GiftItem } from '@/constants/GiftItem';

export const useProductSummary = (productId: number) => {
  const [product, setProduct] = useState<GiftItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await fetchProductSummary(productId, navigate);
        setProduct(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [productId, navigate]);

  return { product, loading, error };
};
