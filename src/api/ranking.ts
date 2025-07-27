import { apiClient } from './apiClient';

export type FilterValue = 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
export type TabValue = 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';

export interface Product {
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

export const fetchRanking = async (
  filter: FilterValue,
  type: TabValue
): Promise<Product[]> => {
  const res = await apiClient.get('/api/products/ranking', {
    params: { targetType: filter, rankType: type },
  });
  return res.data?.data ?? [];
};
