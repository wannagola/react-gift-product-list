import React from 'react';
import styled from '@emotion/styled';

import { useRanking } from '@/hooks/useRanking';
import Spinner from '@/components/common/Spinner';
import GiftItemCard from '@/components/GiftRanking/GiftItemCard';
import GiftRankingFilter, {
  FilterValue,
} from '@/components/GiftRanking/GiftRankingFilter';
import GiftRankingTab from '@/components/GiftRanking/GiftRankingTab';
import type { TabValue } from '@/constants/RankingTabs';

const PAGE_SIZE = 10;

const RankingSection: React.FC = () => {
  const [filter, setFilter] = React.useState<FilterValue>('ALL');
  const [tab, setTab] = React.useState<TabValue>(() => {
    const saved = localStorage.getItem('lastTab') as TabValue | null;
    const validTabs: TabValue[] = [
      'MANY_WISH',
      'MANY_RECEIVE',
      'MANY_WISH_RECEIVE',
    ];
    return saved && validTabs.includes(saved) ? saved : 'MANY_WISH';
  });
  const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);

  React.useEffect(() => {
    localStorage.setItem('lastTab', tab);
    setVisibleCount(PAGE_SIZE);
  }, [tab, filter]);

  const { products, loading, error } = useRanking(filter, tab);

  if (loading) return <Spinner />;

  const visibleItems = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  return (
    <Section>
      <SectionTitle>실시간 급상승 선물랭킹</SectionTitle>
      <GiftRankingFilter selected={filter} onChange={setFilter} />
      <GiftRankingTab selected={tab} onChange={setTab} />

      <ContentArea>
        {error ? (
          <ErrorMsg>불러오는 중 오류가 발생했습니다.</ErrorMsg>
        ) : products.length === 0 ? (
          <ErrorMsg>상품이 없습니다.</ErrorMsg>
        ) : (
          <>
            <Grid>
              {visibleItems.map((p, idx) => (
                <CardWrapper key={p.id}>
                  <RankBadge>{idx + 1}</RankBadge>
                  <GiftItemCard
                    item={{
                      id: p.id,
                      name: p.name,
                      imageURL: p.imageURL,
                      price: {
                        basicPrice: p.price.basicPrice,
                        sellingPrice: p.price.sellingPrice,
                        discountRate: p.price.discountRate,
                      },
                      brandInfo: {
                        id: p.brandInfo.id,
                        name: p.brandInfo.name,
                        imageURL: p.brandInfo.imageURL,
                      },
                    }}
                  />
                </CardWrapper>
              ))}
            </Grid>

            {hasMore && (
              <MoreButton onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>
                더보기
              </MoreButton>
            )}
          </>
        )}
      </ContentArea>
    </Section>
  );
};

export default RankingSection;

const Section = styled.section`
  padding: 24px 16px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.textColors.default};
`;

const ContentArea = styled.div`
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CardWrapper = styled.li`
  position: relative;
`;

const RankBadge = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.colors.gray200};
  color: white;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
  line-height: 20px;
  text-align: center;
`;

const MoreButton = styled.button`
  width: 100%;
  padding: 12px 0;
  margin-top: 16px;
  background: ${({ theme }) => theme.colors.gray100};
  border: 1px solid ${({ theme }) => theme.borderColors.default};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

const ErrorMsg = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.red500};
  margin: 16px 0;
`;
