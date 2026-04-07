import { useEffect, useRef } from 'react';

export function useMounted(): () => boolean {
  const m = useRef(true);
  useEffect(() => {
    m.current = true;
    return () => {
      m.current = false;
    };
  }, []);
  return () => m.current;
}
