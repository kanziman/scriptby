import { FormattedMessage } from "react-intl";
import { useLocation } from "react-router-dom";
import ErrorMessage from "../../ui/ErrorMessage";
import Heading from "../../ui/Heading";
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
        <MainHeading right="moveBack">
          <Heading as="h1">
            <FormattedMessage id="menu.movie" />
          </Heading>
        </MainHeading>
        <TrendItemMovieDetail play={play} />
      </>
    );
  } else if (location.pathname.includes("/trend/tv/")) {
    return (
      <>
        <MainHeading right="moveBack">
          <Heading as="h1">
            <FormattedMessage id="menu.tv" />
          </Heading>
        </MainHeading>
        <TrendItemTvDetail play={play} />
      </>
    );
  } else {
    return <ErrorMessage error={`Trend detail not found`} />;
  }
}

export default TrendDetail;
