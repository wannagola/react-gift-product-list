import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { apiClient } from '@/api/apiClient';
import { AxiosError } from 'axios';

type Props = {
  onLoginSuccess: () => void;
};

type LoginResponse = {
  message?: string;
  data?: {
    message?: string;
    email: string;
    name: string;
    token: string;
  };
};

export const useLoginForm = ({ onLoginSuccess }: Props) => {
  const { login } = useAuth();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [idError, setIdError] = useState('');
  const [pwError, setPwError] = useState('');

  const validateId = (): boolean => {
    if (!id.trim()) {
      setIdError('ID를 입력해주세요.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(id)) {
      setIdError('ID는 이메일 형식이어야 합니다.');
      return false;
    }
    if (!id.endsWith('@kakao.com')) {
      setIdError('ID는 @kakao.com 도메인이어야 합니다.');
      return false;
    }
    setIdError('');
    return true;
  };

  const validatePw = (): boolean => {
    if (!pw.trim()) {
      setPwError('PW를 입력해주세요.');
      return false;
    }
    if (pw.length < 8) {
      setPwError('PW는 최소 8글자 이상이어야 합니다.');
      return false;
    }
    setPwError('');
    return true;
  };

  const handleLogin = async () => {
    if (!validateId() || !validatePw()) return;

    try {
      const response = await apiClient.post<LoginResponse>('/api/login', {
        email: id,
        password: pw,
      });

      const { email, name, token } = response.data.data!;
      login({ email, name, authToken: token });
      onLoginSuccess();
    } catch (e: unknown) {
      let msg = '로그인 중 오류가 발생했습니다.';

      if (e instanceof AxiosError) {
        const resData = e.response?.data;
        msg = resData?.data?.message ?? resData?.message ?? e.message;
      }

      setPwError(msg);
    }
  };

  return {
    id,
    pw,
    setId,
    setPw,
    idError,
    pwError,
    validateId,
    validatePw,
    handleLogin,
  };
};
