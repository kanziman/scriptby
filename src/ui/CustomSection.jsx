import { HiLink } from "react-icons/hi2";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import FlagText from "../ui/FlagText";
import ActionContainer from "./ActionContainer";

const StyledSection = styled.section`
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding: 1rem 2rem;
  background-color: var(--color-grey-200);
  color: var(--color-grey-800);
  gap: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  color: var(--color-grey-800);

  h2 {
    border-bottom: 1px solid var(--color-grey-300);
    padding-bottom: 0.8rem;
  }
  @media (max-width: 50rem) {
    gap: 0.8rem;
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  color: var(--color-grey-600);

  @media (max-width: 50rem) {
    gap: 0.2rem;
  }
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.2rem;

  span {
    display: inline-flex;
    align-items: center;
  }
`;

const HomepageLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
  color: var(--color-brand-600);
  transition: all 0.2s;

  &:hover {
    color: var(--color-brand-800);
    transform: translateX(4px);
  }
`;

const BottomContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SeasonCount = styled.p`
  font-weight: 500;
  color: var(--color-grey-700);
  margin: 0;
`;

function CustomSection({
  name,
  originalLanguage,
  date,
  vote,
  isTv,
  numberOfSeasons,
  homepage,
}) {
  const { user } = useUser();
  const play = user?.play;

  return (
    <StyledSection>
      <h2>{name}</h2>

      <DetailsContainer>
        <DetailItem>
          <FlagText code={originalLanguage} type={"horizontal"} />
        </DetailItem>

        {date && (
          <DetailItem>
            <span>🗓</span>
            <span>{date}</span>
          </DetailItem>
        )}

        <DetailItem>
          <span>⭐️</span>
          <span>{vote} TMDB rating</span>
        </DetailItem>

        {homepage && (
          <DetailItem>
            <HomepageLink
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
            >
              <HiLink />
              <span>Visit Homepage</span>
            </HomepageLink>
          </DetailItem>
        )}
      </DetailsContainer>

      <BottomContainer>
        {isTv && numberOfSeasons && (
          <SeasonCount>{`Total ${numberOfSeasons} seasons`}</SeasonCount>
        )}

        {<ActionContainer play={play} isTv={isTv} />}
      </BottomContainer>
    </StyledSection>
  );
}

export default CustomSection;
