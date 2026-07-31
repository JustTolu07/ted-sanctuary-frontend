import { useEffect, useState } from "react";
import { getCare } from "../services/care";

export function useCare() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCare()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}