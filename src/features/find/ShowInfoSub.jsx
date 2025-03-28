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
  font-size: 1.4rem;
  color: var(--color-grey-400);
  border-radius: 4px;
  @media (max-width: 50rem) {
    gap: 0.4rem;
    font-size: 1rem;
  }
`;

function ShowInfoSub() {
  const { cleanedShow } = useQuery();
  const { date, runTime, genres, isTv, overview } = cleanedShow;

  return (
    <DescriptionSection>
      {overview && (
        <OverviewText>
          <TextExpander collapsedNumWords={20}>{overview}</TextExpander>
        </OverviewText>
      )}
      {isTv ? (
        <InfoWrapper>
          <p>Genres: {genres}</p>
          <p>First Aired: {date}</p>
          <p>Run time: {runTime} min</p>
        </InfoWrapper>
      ) : (
        <InfoWrapper>
          <p>Genres: {genres}</p>
          <p>Realeased: {date}</p>
          <p>Run time: {runTime} min</p>
        </InfoWrapper>
      )}
    </DescriptionSection>
  );
}

export default ShowInfoSub;
