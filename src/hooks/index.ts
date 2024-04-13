import { useState, useEffect, useCallback } from 'react';
import { ApiResponse } from '../types';



export function useBackendApi<T>(): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = (url: string) => useCallback(() => {
    (async () => {
        setLoading(true);
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          setData(result);
        } catch (error) {
          setError(error as Error);
        } finally {
          setLoading(false);
        }
      })();
  }, [url]);

  return { data, loading, error, fetchData };
}

