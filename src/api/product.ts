import { apiClient } from './apiClient';

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
