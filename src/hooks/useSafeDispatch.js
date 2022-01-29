import { useRef, useCallback, useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useSafeDispatch = () => {
  const unsafeDispatch = useDispatch();
  const mountedRef = useRef(false);
  useLayoutEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);

  const safeDispatch = useCallback(
    (...args) => {
      if (mountedRef.current) {
        unsafeDispatch(...args);
      }
    },
    [unsafeDispatch],
  );
  return safeDispatch;
};
