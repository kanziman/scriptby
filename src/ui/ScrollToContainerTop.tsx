import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface ScrollOffset {
  top?: number;
  behavior?: ScrollBehavior;
}

interface ScrollByOffsetProps {
  offset?: ScrollOffset;
}

function ScrollByOffset({
  offset = { top: -200, behavior: "smooth" },
}: ScrollByOffsetProps) {
  const location = useLocation();

  useEffect(() => {
    window.scrollBy(offset);
  }, [location]);

  return null;
}

export default ScrollByOffset;
