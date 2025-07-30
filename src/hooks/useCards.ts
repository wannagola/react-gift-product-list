import { useEffect, useState } from 'react';
import { messageCards } from '@/mock/cards';

export const useCards = () => {
  const [cards, setCards] = useState(messageCards);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        setCards(messageCards);
        setLoading(false);
      } catch (e) {
        setError(e as Error);
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return { cards, loading, error };
};
