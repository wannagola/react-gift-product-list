import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

import { messageCards } from '@/mock/cards';
import { giftItems } from '@/mock/giftItems';
import OrderForm, { OrderFormData } from '@/components/order/OrderForm';
import RecipientsModal from '@/components/order/RecipientsModal';
import { Recipient } from '@/types/order';

const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = giftItems.find((item) => item.id === Number(id));

  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [showModal, setShowModal] = useState(false);

  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  const handleOrderSubmit = (form: OrderFormData) => {
    alert(
      `주문 완료!\n` +
        `상품: ${product.name}\n` +
        `발신자: ${form.sender}\n` +
        `메시지: ${form.message}\n\n` +
        form.recipients
          .map(
            (r, i) => `${i + 1}. ${r.name} / ${r.phone} / 수량 ${r.quantity}개`
          )
          .join('\n')
    );
    navigate('/');
  };

  return (
    <Container>
      <Section>
        <Title>메시지 카드 선택</Title>
        <CardThumbRow>
          {messageCards.map((card, idx) => (
            <CardThumb
              key={card.id}
              src={card.thumbUrl}
              alt={card.defaultTextMessage}
              isSelected={selectedCardIndex === idx}
              onClick={() => setSelectedCardIndex(idx)}
            />
          ))}
        </CardThumbRow>

        <SelectedCardBox>
          <SelectedCardImg
            src={messageCards[selectedCardIndex].imageUrl}
            alt={messageCards[selectedCardIndex].defaultTextMessage}
          />
        </SelectedCardBox>
      </Section>

      {/* 주문 폼 */}
      <OrderForm
        product={product}
        defaultMessage={messageCards[selectedCardIndex].defaultTextMessage}
        recipients={recipients}
        onEditRecipients={() => setShowModal(true)}
        onSubmit={handleOrderSubmit}
      />

      {/* 받는 사람 모달 */}
      <RecipientsModal
        isOpen={showModal}
        initialRecipients={recipients}
        onSave={(newRecipients: Recipient[]) => {
          setRecipients(newRecipients);
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
    ${({ theme }) => theme.spacing.spacing4}
    120px; /* bottom space for fixed button */
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
