import { apiClient } from '@/api/apiClient';
import { API_PATH } from '@/constants/api';
import { GiftItem } from '@/constants/GiftItem';
import { NavigateFunction } from 'react-router-dom';

export interface ProductBasic {
  id: number;
  name: string;
  price: number;
  imageURL: string;
  brandName: string;
}

interface ApiResponse<T> {
  data: T;
}

export const fetchProductBasic = async (
  productId: number
): Promise<ProductBasic> => {
  const res = await apiClient.get<ApiResponse<ProductBasic>>(
    `/api/products/${productId}`
  );
  return res.data.data;
};

export const fetchProductSummary = async (
  productId: number,
  navigate: NavigateFunction
): Promise<GiftItem> => {
  try {
    const res = await apiClient.get<ApiResponse<GiftItem>>(
      API_PATH.PRODUCT_SUMMARY(productId)
    );
    return res.data.data;
  } catch (error) {
    console.error('상품 요약 정보 불러오기 실패:', error);
    navigate('/');
    throw error;
  }
};
