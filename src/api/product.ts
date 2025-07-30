import { apiClient } from '@/api/apiClient';
import { toast } from 'react-toastify';
import { Product } from './ranking';
import { NavigateFunction } from 'react-router-dom';

export interface ProductBasic {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
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
  productId: string,
  navigate: NavigateFunction
): Promise<Product | null> => {
  try {
    const res = await apiClient.get(`/products/${productId}/summary`);
    return res.data?.data ?? null;
  } catch (err: any) {
    const msg =
      err.response?.data?.data?.message ||
      err.response?.data?.message ||
      '상품 정보를 불러오지 못했습니다.';
    toast.error(msg);
    navigate('/');
    return null;
  }
};
