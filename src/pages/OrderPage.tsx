import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import OrderForm, { OrderFormData } from '@/components/order/OrderForm';
import RecipientsModal from '@/components/order/RecipientsModal';
import Spinner from '@/components/common/Spinner';
import { useCards } from '@/hooks/useCards';
import { useProductSummary } from '@/hooks/useProductSummary';
import { useAuth } from '@/contexts/AuthContext';
import { fetchOrderSubmit } from '@/api/order';
import type { Recipient } from '@/types/order';

interface ErrorResponse {
  message?: string;
  data?: {
    message?: string;
  };
}

const OrderPage = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const navigate = useNavigate();

  const {
    product,
    loading: productLoading,
    error: productError,
  } = useProductSummary(productId);

  const { cards, loading: cardsLoading, error: cardsError } = useCards();
  const { user } = useAuth();

  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [showModal, setShowModal] = useState(false);

  if (productLoading || cardsLoading) return <Spinner />;
  if (productError)
    return <ErrorText>상품 정보를 불러오는 중 오류가 발생했습니다.</ErrorText>;
  if (!product) return <ErrorText>존재하지 않는 상품입니다.</ErrorText>;
  if (cardsError)
    return (
      <ErrorText>메시지 카드를 불러오는 중 오류가 발생했습니다.</ErrorText>
    );

  const handleOrderSubmit = async (form: OrderFormData) => {
    if (!user) {
      toast.error('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    if (form.recipients.length === 0) {
      toast.error('받는 사람을 한 명 이상 추가해주세요.');
      return;
    }

    try {
      await fetchOrderSubmit(
        {
          productId,
          sender: form.sender,
          recipients: form.recipients,
        },
        user.authToken,
        navigate
      );
      toast.success('주문이 완료되었습니다!');
      navigate('/');
    } catch (err: unknown) {
      const error = err as AxiosError<ErrorResponse>;
      const status = error.response?.status;

      if (status === 401) {
        toast.error('로그인이 만료되었습니다. 다시 로그인해주세요.');
        navigate('/login');
      } else {
        const msg =
          error.response?.data?.data?.message ||
          error.response?.data?.message ||
          error.message ||
          '주문 중 오류가 발생했습니다.';
        toast.error(msg);
      }
    }
  };

  return (
    <Container>
      <Section>
        <Title>메시지 카드 선택</Title>
        <CardThumbRow>
          {cards.map((card, idx) => (
            <CardThumb
              key={card.id}
              src={card.imageUrl}
              alt={card.defaultTextMessage}
              isSelected={selectedCardIndex === idx}
              onClick={() => setSelectedCardIndex(idx)}
            />
          ))}
        </CardThumbRow>
        <SelectedCardBox>
          <SelectedCardImg
            src={cards[selectedCardIndex].imageUrl}
            alt={cards[selectedCardIndex].defaultTextMessage}
          />
        </SelectedCardBox>
      </Section>

      <OrderForm
        product={product}
        defaultMessage={cards[selectedCardIndex].defaultTextMessage}
        recipients={recipients}
        onEditRecipients={() => setShowModal(true)}
        onSubmit={handleOrderSubmit}
        defaultSender={user?.name ?? ''}
      />

      <RecipientsModal
        isOpen={showModal}
        initialRecipients={recipients}
        onSave={(newRecips: Recipient[]) => {
          setRecipients(newRecips);
          setShowModal(false);
        }}
        onClose={() => setShowModal(false)}
      />
    </Container>
  );
};

export default OrderPage;

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing6}
    ${({ theme }) => theme.spacing.spacing4} 120px;
  max-width: 720px;
  margin: 0 auto;
  background: ${({ theme }) => theme.backgroundColors.default};
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.spacing6};
`;

const Title = styled.h2`
  font: ${({ theme }) => theme.typography.label2Bold};
  color: ${({ theme }) => theme.textColors.default};
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
`;

const CardThumbRow = styled.div`
  display: flex;
  overflow-x: auto;
  gap: ${({ theme }) => theme.spacing.spacing2};
  padding-bottom: ${({ theme }) => theme.spacing.spacing2};
`;

const CardThumb = styled.img<{ isSelected: boolean }>`
  width: 60px;
  height: 60px;
  border-radius: ${({ theme }) => theme.spacing.spacing2};
  border: ${({ isSelected, theme }) =>
    isSelected
      ? `2px solid ${theme.sementicColors.kakaoYellow}`
      : '2px solid transparent'};
  cursor: pointer;
  flex: 0 0 auto;
`;

const SelectedCardBox = styled.div`
  display: flex;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.spacing5} 0;
`;

const SelectedCardImg = styled.img`
  width: 240px;
  border-radius: ${({ theme }) => theme.spacing.spacing4};
`;

const ErrorText = styled.p`
  color: red;
  text-align: center;
  margin: ${({ theme }) => theme.spacing.spacing4} 0;
`;
