import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function LocationLogger() {
  const location = useLocation();
  useEffect(() => {
    // console.log("Location changed:", location);
    // console.log("History length:", window.history.length);
  }, [location]);
  return null;
}
export default LocationLogger;
