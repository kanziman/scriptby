import { HiLink } from "react-icons/hi2";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import FlagText from "./FlagText";
import Heading from "./Heading";

const StyledSection = styled.section`
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  padding: 1rem 2rem;
  background-color: var(--color-grey-200);
  color: var(--color-grey-800);
  gap: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);

  h2 {
    border-bottom: 1px solid var(--color-grey-300);
    padding-bottom: 0.8rem;
  }

  @media (${(props) => props.theme.media.tablet}) {
    gap: 0.8rem;
  }
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  color: var(--color-grey-600);

  @media (${(props) => props.theme.media.tablet}) {
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

  @media (max-width: 60em) {
    font-size: 1.4rem;
  }
`;

const SeasonCount = styled.p`
  font-weight: 500;
  color: var(--color-grey-700);
  margin: 0;
`;

interface CustomSectionProps {
  name: string;
  originalLanguage: string;
  date?: string;
  vote?: number;
  isTv: boolean;
  numberOfSeasons?: number;
  homepage?: string;
}

function CustomSection({
  name,
  originalLanguage,
  date,
  vote,
  isTv,
  numberOfSeasons,
  homepage,
}: CustomSectionProps): JSX.Element {
  const { user } = useUser();
  const play = user?.play;

  return (
    <StyledSection>
      <Heading as="h1">{name}</Heading>
      <DetailsContainer>
        <DetailItem>
          <FlagText code={originalLanguage} type="horizontal" gap="0.8rem" />
        </DetailItem>

        {date && (
          <DetailItem>
            <span>🗓</span>
            <span>{date}</span>
          </DetailItem>
        )}

        {vote && (
          <DetailItem>
            <span>⭐️</span>
            <span>{vote}</span>
          </DetailItem>
        )}

        {homepage && (
          <DetailItem>
            <HomepageLink
              href={homepage}
              target="_blank"
              rel="noopener noreferrer"
            >
              <HiLink />
              <span>
                <FormattedMessage
                  id="homepage.visit"
                  defaultMessage="Visit Homepage"
                />
              </span>
            </HomepageLink>
          </DetailItem>
        )}
      </DetailsContainer>

      <BottomContainer>
        {isTv && numberOfSeasons && (
          <SeasonCount>
            <FormattedMessage
              id="season.total"
              defaultMessage="Total {seasons} seasons"
              values={{ seasons: numberOfSeasons }}
            />
          </SeasonCount>
        )}

        {/* <ActionContainer play={play} isTv={isTv} /> */}
      </BottomContainer>
    </StyledSection>
  );
}

export default CustomSection;
