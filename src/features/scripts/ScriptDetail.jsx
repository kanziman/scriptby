import { useEffect } from "react";
import { useIntl } from "react-intl";
import { useParams, useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import MainHeading from "../../ui/MainHeading";
import {
  EpisodeInfo,
  EpisodeLabel,
  EpisodeName,
  ShowInfoWrapper,
  ShowTitle,
} from "../../ui/ShowTitleGroup";
import Spinner from "../../ui/Spinner";
import { shortName } from "../../utils/helpers";
import Screen from "./Screen";
import { useScriptOne } from "./useScriptOne";

function ScriptDetail() {
  const { scriptId } = useParams();
  const {
    // showName,
    episodeName,
    isPending,
    episodeNumber,
    seasonNumber,
    show,
    // showCategory,
  } = useScriptOne({ scriptId });
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get("page");

  useEffect(() => {
    if (!pageParam) {
      const newParams = new URLSearchParams(searchParams);
      newParams.set("page", "1");
      setSearchParams(newParams, { replace: true });
    }
  }, [pageParam, searchParams, setSearchParams]);

  const intl = useIntl();
  const resourceName = intl.formatMessage({ id: "menu.script" });

  if (isPending) return <Spinner />;
  if (!scriptId) {
    return <Empty resource={resourceName} />;
  }

  return (
    <>
      <MainHeading right="moveBack">
        {show?.category === "tv" ? (
          <ShowInfoWrapper>
            <ShowTitle>{show?.originalName}</ShowTitle>
            <EpisodeInfo>
              <EpisodeLabel>Season {seasonNumber}</EpisodeLabel>
              <EpisodeLabel>Episode {episodeNumber}</EpisodeLabel>
            </EpisodeInfo>
            <EpisodeName>{shortName(episodeName)}</EpisodeName>
          </ShowInfoWrapper>
        ) : (
          <ShowInfoWrapper>
            <ShowTitle>{show?.originalName}</ShowTitle>
          </ShowInfoWrapper>
        )}
      </MainHeading>

      {/* MAIN */}
      <Screen />
    </>
  );
}

export default ScriptDetail;
