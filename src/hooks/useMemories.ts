import { useEffect, useState } from "react";
import { getMemories } from "../services/memories";

export function useMemories() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMemories()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
}