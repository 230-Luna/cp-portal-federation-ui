import React, { useState, useEffect } from "react";
import axios from "axios";

interface ApiConfig {
  apiUrl: string;
}

interface Response {
  code: number;
  message: string;
  data: {
    listMeta: ListMeta;
    propagationpolicys: PropagationPolicy[];
    errors: any[];
  };
}

export default function useApi<T>({
  remoteFn,
}: {
  remoteFn: () => Promise<T>;
}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      setLoading(true);
      const response = await httpClient.get(remoteFn);
      console.log(response);
      setData(response.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    return fetchData();
  };

  return { data, loading, error, refetch };
}
