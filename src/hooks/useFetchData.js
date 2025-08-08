import { useEffect, useState } from "react";

export function useFetchData(url) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function getData() {
      try {
        const response = await fetch(url);
        if (isMounted) {
          setData(await response.json());
        }
      } catch (err) {
        if (isMounted) {
          setHasError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    getData();

    return () => {
      isMounted = false; // cleanup function on unmount
    };
  }, [url]);

  return { isLoading, hasError, data };
}
