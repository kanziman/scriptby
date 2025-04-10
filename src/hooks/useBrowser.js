import { useEffect, useState } from "react";

export function useBrowser() {
  const [isSmall, setIsSmall] = useState(window.innerWidth <= 800);

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isSmall;
}
