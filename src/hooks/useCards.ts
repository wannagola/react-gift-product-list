import { useEffect, useState } from 'react';
import { fetchCards, Card } from '@/api/cards';

export const useCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchCards()
      .then(setCards)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { cards, loading, error };
};
