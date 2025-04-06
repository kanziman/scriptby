import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { useQuery } from "../../context/QueryContext";
import TextExpander from "../../ui/Basic/TextExpander";

const DescriptionSection = styled.section`
  padding: 2rem;
  border-radius: 8px;
`;

const OverviewText = styled.div`
  font-size: 1.6rem;
  line-height: 1.8;
  color: var(--color-grey-800);
  margin-bottom: 2rem;
  @media (max-width: 50rem) {
    font-size: 1.2rem;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-size: 1.2rem;
  color: var(--color-grey-400);
  border-radius: 4px;
  @media (max-width: 50rem) {
    gap: 0.4rem;
    font-size: 1rem;
  }
`;

function ShowInfoSub() {
  const { cleanedShow } = useQuery();
  const {
    date,
    runTime,
    genres,
    isTv,
    overview,
    numberOfSeasons,
    numberOfEpisodes,
  } = cleanedShow;

  return (
    <DescriptionSection>
      {overview && (
        <OverviewText>
          <TextExpander collapsedNumWords={20}>{overview}</TextExpander>
        </OverviewText>
      )}
      {isTv ? (
        <InfoWrapper>
          <p>
            <FormattedMessage id="showInfo.genres" defaultMessage="Genres:" />{" "}
            {genres}
          </p>
          <p>
            <FormattedMessage
              id="showInfo.firstAired"
              defaultMessage="First Aired:"
            />{" "}
            {date}
          </p>
          {runTime && (
            <p>
              <FormattedMessage
                id="showInfo.runTime"
                defaultMessage="Run time:"
              />{" "}
              {runTime}{" "}
              <FormattedMessage id="showInfo.min" defaultMessage="min" />
            </p>
          )}
          {numberOfSeasons && (
            <p>
              <FormattedMessage id="showInfo.seasons" /> {numberOfSeasons}
            </p>
          )}
          {numberOfEpisodes && (
            <p>
              <FormattedMessage id="showInfo.episodes" /> {numberOfEpisodes}
            </p>
          )}
        </InfoWrapper>
      ) : (
        <InfoWrapper>
          <p>
            <FormattedMessage id="showInfo.genres" defaultMessage="Genres:" />{" "}
            {genres}
          </p>
          <p>
            <FormattedMessage
              id="showInfo.released"
              defaultMessage="Released:"
            />{" "}
            {date}
          </p>
          <p>
            <FormattedMessage
              id="showInfo.runTime"
              defaultMessage="Run time:"
            />{" "}
            {runTime}{" "}
            <FormattedMessage id="showInfo.min" defaultMessage="min" />
          </p>
        </InfoWrapper>
      )}
    </DescriptionSection>
  );
}

export default ShowInfoSub;
