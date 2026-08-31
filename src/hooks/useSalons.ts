import { useCallback, useEffect, useState } from "react";
import { getSalons, type Salon } from "../lib/salons";

export function useSalons() {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSalons();
      setSalons(data);
    } catch (e: unknown) {
      if (e && typeof e === "object" && "message" in e) {
        setError(String((e as { message: unknown }).message));
      } else {
        setError(e instanceof Error ? e.message : String(e));
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { salons, loading, error, refresh };
}
