import { apiClient } from './apiClient';

export type FilterValue = 'all' | 'female' | 'male' | 'teen';
export type TabValue    = 'wish' | 'sent' | 'wishlist';

export interface Product {
  id: number;
  name: string;
  price: {
    basicPrice:    number;
    sellingPrice:  number;
    discountRate:  number;
  };
  imageURL: string;
  brandInfo: {
    id:       number;
    name:     string;
    imageURL: string;
  };
}

interface ApiResponse<T> {
  data: T;
}

export const fetchRanking = async (
  filter: FilterValue,
  type:   TabValue,
): Promise<Product[]> => {
  const res = await apiClient.get<ApiResponse<Product[]>>(
    '/api/products/ranking',
    { params: { filter, type } }
  );
  return res.data.data;
};
