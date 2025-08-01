import { apiClient } from '@/api/apiClient';
import { GiftItem } from '@/constants/GiftItem';
import { NavigateFunction } from 'react-router-dom';

interface ApiResponse<T> {
  data: T;
}

export const fetchProductSummary = async (
  productId: number,
  navigate: NavigateFunction
): Promise<GiftItem> => {
  try {
    const res = await apiClient.get<ApiResponse<GiftItem>>(
      `/api/products/${productId}`
    );
    return res.data.data;
  } catch (error) {
    console.error('상품 요약 정보 불러오기 실패:', error);
    navigate('/');
    throw error;
  }
};
