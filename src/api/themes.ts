import { apiClient } from './apiClient';

export interface Theme {
  themeId: number;
  name: string;
  image: string;
}

interface ApiResponse<T> {
  data: T;
}

export const fetchThemes = async (): Promise<Theme[]> => {
  const response = await apiClient.get<ApiResponse<Theme[]>>('/api/themes');
  return response.data.data;
};
