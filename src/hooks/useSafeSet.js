import { useRef, useCallback, useLayoutEffect, useState } from 'react';

export const useSafeSet = initialValue => {
  const [state, setState] = useState(initialValue);
  const mountedRef = useRef(false);
  useLayoutEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);

  const safeSet = useCallback(
    (...args) => {
      if (mountedRef.current) {
        setState(...args);
      }
    },
    [setState],
  );
  return [state, safeSet];
};
