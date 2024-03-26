import { useEffect, useRef } from 'react';
import isFunction from "lodash/isFunction";

export function useOnce<T>(value: T | (() => T)): T {
  const valueRef = useRef<T>();
  const hasCachedValueRef = useRef(false);
  if (!hasCachedValueRef.current) {
    if (isFunction(value)) {
      valueRef.current = value();
    } else {
      valueRef.current = value;
    }
    hasCachedValueRef.current = true;
  }
  return valueRef.current as T;
}

export const usePrevious = <T>(value: T): T | null => {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
