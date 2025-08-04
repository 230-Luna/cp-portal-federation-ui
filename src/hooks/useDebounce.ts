import { useState, useEffect, useCallback } from 'react';

interface UseDebounceOptions {
  delay: number;
}

export const useDebounce = <T>(value: T, { delay }: UseDebounceOptions): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const updateDebouncedValue = useCallback(() => {
    setDebouncedValue(value);
  }, [value]);

  useEffect(() => {
    const timeoutId = setTimeout(updateDebouncedValue, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay, updateDebouncedValue]);

  return debouncedValue;
};
