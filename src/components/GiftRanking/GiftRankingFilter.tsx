import React from 'react';
import styled from '@emotion/styled';

export const filters = [
  { label: '전체', value: 'ALL', icon: '👥' },
  { label: '여성이', value: 'FEMALE', icon: '👩' },
  { label: '남성이', value: 'MALE', icon: '👨' },
  { label: '청소년이', value: 'TEEN', icon: '🧒' },
] as const;

export type FilterValue = (typeof filters)[number]['value'];

interface Props {
  selected: FilterValue;
  onChange: (value: FilterValue) => void;
}

const GiftRankingFilter: React.FC<Props> = ({ selected, onChange }) => (
  <FilterContainer>
    {filters.map((f) => (
      <FilterButton
        key={f.value}
        selected={selected === f.value}
        onClick={() => onChange(f.value)}
      >
        <span className="icon">{f.icon}</span>
        <span className="label">{f.label}</span>
      </FilterButton>
    ))}
  </FilterContainer>
);

export default GiftRankingFilter;

const FilterContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const FilterButton = styled.button<{ selected: boolean }>`
  flex: 1;
  padding: 8px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme, selected }) =>
    selected ? theme.colors.blue700 : theme.colors.blue100};
  color: ${({ theme, selected }) =>
    selected ? theme.colors.gray00 : theme.textColors.default};
  border: none;
  cursor: pointer;

  .icon {
    font-size: 18px;
    margin-bottom: 4px;
  }
`;
