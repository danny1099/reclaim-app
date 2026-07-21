import { useCallback, useEffect, useState } from "react";

/* prettier-ignore */
export const useAsync = <T>(asyncFunction: () => Promise<T>, deps: any[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    setData(null);
    asyncFunction()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [...deps]);

  useEffect(() => {
    run();
  }, [run]);

  return { data, loading, error, run };
};
