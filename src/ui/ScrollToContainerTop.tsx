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
  offset = { percent: 0.1, behavior: "smooth" },
}: {
  offset?: { percent?: number; behavior?: ScrollBehavior };
}) {
  const location = useLocation();

  useEffect(() => {
    const targetY = window.innerHeight * (offset.percent ?? 0.1);
    window.scrollTo({
      top: targetY,
      behavior: offset.behavior ?? "smooth",
    });
  }, [location]);

  return null;
}

export default ScrollByOffset;
