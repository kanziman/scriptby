import { useEffect, useRef } from "react";

export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  listenCapture = true
): React.RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }

    document.addEventListener("click", handleClick, listenCapture);
    return () =>
      document.removeEventListener("click", handleClick, listenCapture);
  }, [handler, listenCapture]);

  return ref;
}
