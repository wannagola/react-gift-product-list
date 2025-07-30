import { apiClient } from './apiClient';
import { toast } from 'react-toastify';
import { NavigateFunction } from 'react-router-dom';

type OrderParams = {
  productId: number;
  sender: string;
  recipients: {
    name: string;
    phone: string;
    quantity: number;
  }[];
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
  } catch (err: any) {
    if (err.response?.status === 401) {
      toast.error('로그인이 필요합니다.');
      navigate('/login');
    } else {
      toast.error('주문에 실패했습니다.');
    }
  }
};
