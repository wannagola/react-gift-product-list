import styled from '@emotion/styled';
import { FiPlus } from 'react-icons/fi';

const FriendSelectSection = () => {
  return (
    <Wrapper>
      <InnerBox>
        <PlusIconWrapper>
          <FiPlus size={20} color="#000" />
        </PlusIconWrapper>
        <Text>선물할 친구를 선택해 주세요.</Text>
      </InnerBox>
    </Wrapper>
  );
};

export default FriendSelectSection;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.gray100};
  padding: ${({ theme }) => theme.spacing.spacing6}; // spacing6 = 24px
`;

const InnerBox = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray00}; // 흰색
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing.spacing4}; // spacing4 = 16px
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

const PlusIconWrapper = styled.div`
  width: 36px;
  height: 36px;
  background-color: ${({ theme }) => theme.sementicColors.kakaoYellow};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ theme }) => theme.spacing.spacing3}; // spacing3 = 12px
`;

const Text = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.textColors.default};
`;
