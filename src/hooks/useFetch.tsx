import { useEffect, useState } from 'react';

type FetchData<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

const useFetch = <T,>(url: string, key: string): FetchData<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async (url: string, key: string) => {
      setIsLoading(true);
      try {
        let data: T | null = JSON.parse(
          window.localStorage.getItem(key) || 'null'
        );

        if (!data || !key) {
          const response = await fetch(url, { signal: controller.signal });
          data = await response.json();
          window.localStorage.setItem(key, JSON.stringify(data));
        }

        if (isMounted) {
          setData(data);
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          if (error instanceof Error) {
            setError(error.message);
          }
          setData(null);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    fetchData(url, key);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [url]);
  return { data, isLoading, error };
};

export default useFetch;
