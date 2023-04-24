import { useEffect, useRef, useState } from 'react';

export function useThrottle<T>(value: T, delay: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!timeoutRef.current) {
      timeoutRef.current = setTimeout(() => {
        setThrottledValue(value);
        timeoutRef.current = undefined;
      }, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
    };
  }, [value, delay]);

  return throttledValue;
}
