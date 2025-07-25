import { useEffect, useState } from 'react';
import { fetchThemes, Theme } from '@/api/themes';

export const useThemes = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchThemes()
      .then(setThemes)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { themes, loading, error };
};
