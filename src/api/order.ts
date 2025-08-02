import { apiClient } from './apiClient';
import { NavigateFunction } from 'react-router-dom';
import { AxiosError } from 'axios';
import { API_PATH } from '@/constants/api';

type OrderParams = {
  productId: number;
  message: string;
  messageCardId: string;
  ordererName: string;
  receivers: {
    name: string;
    phoneNumber: string;
    quantity: number;
  }[];
};

type OrderErrorResponse = {
  message?: string;
};

type OrderSubmitResult = {
  success: boolean;
  message?: string;
};

export const fetchOrderSubmit = async (
  order: OrderParams,
  token: string,
  navigate: NavigateFunction
): Promise<OrderSubmitResult> => {
  try {
    await apiClient.post(API_PATH.ORDER, order, {
      headers: {
        Authorization: token,
      },
    });
    return { success: true };
  } catch (err: unknown) {
    const error = err as AxiosError<OrderErrorResponse>;

    if (error.response?.status === 401) {
      navigate('/login');
      return { success: false, message: '로그인이 필요합니다.' };
    } else if (error.response) {
      return {
        success: false,
        message: error.response.data?.message ?? '주문에 실패했습니다.',
      };
    } else {
      return { success: false, message: '알 수 없는 오류가 발생했습니다.' };
    }
  }
};
