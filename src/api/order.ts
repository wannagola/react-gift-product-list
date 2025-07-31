import { apiClient } from './apiClient';
import { toast } from 'react-toastify';
import { NavigateFunction } from 'react-router-dom';
import { AxiosError } from 'axios';

type OrderParams = {
  productId: number;
  sender: string;
  recipients: {
    name: string;
    phone: string;
    quantity: number;
  }[];
};

type OrderErrorResponse = {
  message?: string;
  data?: {
    message?: string;
  };
};

export const fetchOrderSubmit = async (
  order: OrderParams,
  token: string,
  navigate: NavigateFunction
) => {
  try {
    await apiClient.post('/order', order, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success('주문이 완료되었습니다!');
  } catch (err: unknown) {
    const error = err as AxiosError<OrderErrorResponse>;

    if (error.response?.status === 401) {
      toast.error('로그인이 필요합니다.');
      navigate('/login');
    } else if (error.response) {
      toast.error(
        error.response.data?.data?.message ??
          error.response.data?.message ??
          '주문에 실패했습니다.'
      );
    } else {
      toast.error('알 수 없는 오류가 발생했습니다.');
    }
  }
};
