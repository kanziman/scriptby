import { useState } from "react";

export function useMore(initialCount = 12, increment = 12) {
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + increment);
  };

  return { visibleCount, handleLoadMore };
}
