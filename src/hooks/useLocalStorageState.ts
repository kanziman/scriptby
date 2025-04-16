// ✅ 수정된 useLocalStorageState.ts
import { useEffect, useState } from "react";

export function useLocalStorageState<T>(initialState: T, key: string) {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as T) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue] as const;
}
