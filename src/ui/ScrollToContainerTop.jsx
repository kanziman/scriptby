import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToContainerTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location]);

  return null;
}

export default ScrollToContainerTop;
