import { apiClient } from './apiClient';

export interface ApiResponse<T> {
  data: T;
}

export interface Card {
  id: number | string;
  imageUrl: string;
  label: string;
}

export const fetchCards = async (): Promise<Card[]> => {
  const res = await apiClient.get<ApiResponse<Card[]>>('/api/cards');
  return res.data.data;
};
