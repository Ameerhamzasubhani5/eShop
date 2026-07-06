import { useEffect, useState } from "react";
import { apiFetch, ApiError } from "@/lib/api";

interface UseApiFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Fetches `path` and re-fetches whenever it changes. Pass `null` to skip
 * fetching (e.g. while a required param isn't ready yet). Guards against
 * setting state from a stale request if `path` changes before it resolves.
 */
export function useApiFetch<T>(path: string | null): UseApiFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!path) {
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    apiFetch<T>(path)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : "Something went wrong");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [path]);

  return { data, loading, error };
}
