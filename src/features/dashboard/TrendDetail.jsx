import { useLocation } from "react-router-dom";
import ErrorMessage from "../../ui/ErrorMessage";
import MainHeading from "../../ui/MainHeading";
import { useUser } from "../authentication/useUser";
import TrendItemMovieDetail from "./TrendItemMovieDetail";
import TrendItemTvDetail from "./TrendItemTvDetail";

function TrendDetail() {
  const location = useLocation();

  const { user } = useUser();
  const play = user?.play;

  if (location.pathname.includes("/trend/movie/")) {
    return (
      <>
        <MainHeading right="moveBack"></MainHeading>
        <TrendItemMovieDetail play={play} />
      </>
    );
  } else if (location.pathname.includes("/trend/tv/")) {
    return (
      <>
        <MainHeading right="moveBack"></MainHeading>
        <TrendItemTvDetail play={play} />
      </>
    );
  } else {
    return <ErrorMessage error={`Trend detail not found`} />;
  }
}

export default TrendDetail;
